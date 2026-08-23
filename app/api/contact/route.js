import { NextResponse } from 'next/server'

async function getAccessToken() {
  const { AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET } = process.env

  const res = await fetch(
    `https://login.microsoftonline.com/${AZURE_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:    'client_credentials',
        client_id:     AZURE_CLIENT_ID,
        client_secret: AZURE_CLIENT_SECRET,
        scope:         'https://graph.microsoft.com/.default',
      }),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Token request failed: ${err}`)
  }

  const { access_token } = await res.json()
  return access_token
}

async function sendMail({ token, sender, to, replyTo, subject, html }) {
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${sender}/sendMail`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: 'HTML', content: html },
          toRecipients: [{ emailAddress: { address: to } }],
          ...(replyTo && {
            replyTo: [{ emailAddress: { address: replyTo } }],
          }),
        },
        saveToSentItems: false,
      }),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`sendMail failed: ${err}`)
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, message } = body

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const senderAddress = process.env.MAIL_SENDER
    const token = await getAccessToken()

    const subject = `New enquiry from ${firstName} ${lastName} — Atropos at Home`

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; color: #333;">
        <h2 style="color: #1f2e30;">New enquiry via atroposathome.com.au</h2>
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; width:140px; color:#666;">Name</td>
              <td style="padding:8px 0; border-bottom:1px solid #eee;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Email</td>
              <td style="padding:8px 0; border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Phone</td>
              <td style="padding:8px 0; border-bottom:1px solid #eee;">${phone}</td></tr>` : ''}
        </table>
        <h3 style="margin-top:24px; color:#1f2e30;">Message</h3>
        <p style="line-height:1.7; white-space:pre-wrap;">${message}</p>
        <hr style="margin:32px 0; border:none; border-top:1px solid #eee;" />
        <p style="font-size:12px; color:#999;">Sent from atroposathome.com.au contact form</p>
      </div>
    `

    await sendMail({
      token,
      sender:  senderAddress,
      to:      senderAddress,
      replyTo: email,
      subject,
      html:    htmlBody,
    })

    await sendMail({
      token,
      sender:  senderAddress,
      to:      email,
      subject: 'We received your enquiry — Atropos at Home',
      html: `
        <div style="font-family: sans-serif; max-width: 560px; color: #333;">
          <h2 style="color: #1f2e30;">Thanks, ${firstName}.</h2>
          <p>We've received your enquiry and will be in touch within one business day.</p>
          <p style="color: #666;">— The Atropos at Home team</p>
        </div>
      `,
    })

    if (process.env.ZOHO_ENDPOINT) {
      await fetch(process.env.ZOHO_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          first_name: firstName,
          last_name:  lastName,
          email:      email,
          phone:      phone ?? '',
          channel:    'Atropos at Home - Contact Form',
        }),
      })
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email us directly.' },
      { status: 500 }
    )
  }
}
