import nodemailer from "nodemailer";

class Mailer {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Retorna a melhor URL para usar (3000 → 3001 → fallback)
  private getAppUrl() {
    const primary = process.env.APP_URL || "http://localhost:3000";
    const secondary = process.env.APP_URL_ALT || "http://localhost:3001";

    // Preferência: se você usa muito a 3001, testamos ela primeiro
    return secondary || primary;
  }

  private inviteTemplate(name: string, token: string) {
    const url = this.getAppUrl();
    const link = `${url}/team/invite/${token}`;

    return `
      <div style="font-family: Arial, sans-serif; padding: 24px; background: #f7f7f7;">
        <div style="max-width: 520px; margin: auto; background: #fff; padding: 32px; border-radius: 12px;">

          <h2 style="text-align: center; color: #111;">Convite para fazer parte da equipe</h2>

          <p style="font-size: 16px; color: #333;">
            Olá <strong>${name}</strong>, você foi convidado para fazer parte da equipe no sistema <strong>ELIGI</strong>.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}"
               style="background: #111; color: #fff; padding: 14px 24px; text-decoration: none;
               border-radius: 8px; font-size: 16px;">
               Aceitar convite
            </a>
          </div>

          <p style="font-size: 14px; color: #777;">
            Se você não esperava este e-mail, apenas ignore.
          </p>

          <p style="font-size: 14px; color: #777; margin-top: 32px;">
            Equipe ELIGI 
          </p>

        </div>
      </div>
    `;
  }

  async sendInviteEmail(email: string, name: string, token: string) {
    const html = this.inviteTemplate(name, token);

    await this.transporter.sendMail({
      from: `"ELIGI Sistemas" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Convite para fazer parte da equipe",
      html,
    });
  }
}

export const mailer = new Mailer();
