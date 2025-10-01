import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const to = process.env.CONTACT_TO; // your inbox, e.g. simon@domain.com
const from = process.env.CONTACT_FROM || "portfolio@yourdomain.com";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    console.log(name, email, message);

    // basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    if (!resendApiKey || !to) {
      console.log("[contact]", { name, email, message });
      return NextResponse.json({ ok: true, dev: true });
    }

    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from,
      to: ["simon.max.stancovich+1@gmail.com"],
      subject: `Portfolio contact — ${name}`,
      text: message,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
