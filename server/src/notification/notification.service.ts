import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type OrderEmailItem = {
  productName?: string;
  quantity?: number;
  unitPrice?: number;
  subtotal?: number;
};

type OrderEmailPayload = {
  orderItems?: OrderEmailItem[];
  totalAmount?: number;
  currency?: string;
};

@Injectable()
export class NotificationService {
  constructor(
    private emailService: MailerService,
    private configService: ConfigService,
  ) { }

  private formatMoney(value: number, currency: string) {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.toUpperCase(),
      }).format(value);
    } catch {
      return `${value.toFixed(2)} ${currency.toUpperCase()}`;
    }
  }

  private buildOrderCreatedTemplate(
    orderId: string,
    status: string,
    payload?: OrderEmailPayload,
  ) {
    const items = payload?.orderItems ?? [];
    const normalizedCurrency = (payload?.currency ?? 'usd').toLowerCase();
    const normalizedStatus = status || 'created';
    const totalAmount = Number(payload?.totalAmount ?? 0);
    const frontendUrl =
      this.configService.get<string>('frontend.url') ?? 'http://localhost:3000';
    const normalizedFrontendUrl = frontendUrl.replace(/\/+$/, '');
    const orderLink = `${normalizedFrontendUrl}/orders/${orderId}`;

    const rows =
      items.length > 0
        ? items
            .map((item) => {
              const name = item.productName ?? 'Product';
              const quantity = Number(item.quantity ?? 0);
              const unitPrice = Number(item.unitPrice ?? 0);
              const subtotal = Number(item.subtotal ?? unitPrice * quantity);

              return `
                <tr>
                  <td style="padding:12px;border-bottom:1px solid #ececec;color:#222;font-size:14px;">${name}</td>
                  <td style="padding:12px;border-bottom:1px solid #ececec;color:#444;font-size:14px;text-align:center;">${quantity}</td>
                  <td style="padding:12px;border-bottom:1px solid #ececec;color:#444;font-size:14px;text-align:right;">${this.formatMoney(unitPrice, normalizedCurrency)}</td>
                  <td style="padding:12px;border-bottom:1px solid #ececec;color:#111;font-size:14px;font-weight:600;text-align:right;">${this.formatMoney(subtotal, normalizedCurrency)}</td>
                </tr>
              `;
            })
            .join('')
        : `
          <tr>
            <td colspan="4" style="padding:16px;color:#666;font-size:14px;text-align:center;">No order items available.</td>
          </tr>
        `;

    return `
      <div style="margin:0;padding:24px;background:#f5f7fb;font-family:'Segoe UI',Arial,sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:700px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#0f766e,#115e59);padding:24px 28px;">
              <p style="margin:0 0 8px;color:#ccfbf1;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;">Order Update</p>
              <h1 style="margin:0;color:#ffffff;font-size:26px;line-height:1.3;">Order Created Successfully</h1>
              <p style="margin:10px 0 0;color:#99f6e4;font-size:14px;">Status: ${normalizedStatus.toUpperCase()}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 28px 10px;">
              <p style="margin:0;color:#3f3f46;font-size:14px;">Your order ID: <strong style="color:#111827;">${orderId}</strong></p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 18px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #ececec;border-radius:10px;overflow:hidden;">
                <thead>
                  <tr style="background:#f8fafc;">
                    <th style="padding:12px;text-align:left;color:#334155;font-size:12px;letter-spacing:.4px;text-transform:uppercase;">Item</th>
                    <th style="padding:12px;text-align:center;color:#334155;font-size:12px;letter-spacing:.4px;text-transform:uppercase;">Qty</th>
                    <th style="padding:12px;text-align:right;color:#334155;font-size:12px;letter-spacing:.4px;text-transform:uppercase;">Unit Price</th>
                    <th style="padding:12px;text-align:right;color:#334155;font-size:12px;letter-spacing:.4px;text-transform:uppercase;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;">
                <tr>
                  <td style="padding:14px;color:#111827;font-size:15px;font-weight:700;">Total</td>
                  <td style="padding:14px;color:#0f766e;font-size:18px;font-weight:800;text-align:right;">${this.formatMoney(totalAmount, normalizedCurrency)}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 30px;">
              <a href="${orderLink}" style="display:inline-block;background:#0f766e;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 18px;border-radius:8px;">View Order Details</a>
              <p style="margin:10px 0 0;color:#64748b;font-size:12px;">For more info: <a href="${orderLink}" style="color:#0f766e;word-break:break-all;">${orderLink}</a></p>
            </td>
          </tr>
        </table>
      </div>
    `;
  }

  async sendTextToEmail(to, subject, text) {
    const options = {
      from: 'Ecommerce <ketigelovani@gmail.com>',
      to,
      subject,
      text,
    }

    await this.emailService.sendMail(options)
    return 'sent successfully'
  }

  async sendOrderStatus(
    to,
    orderId,
    status,
    payload?: OrderEmailPayload,
  ) {
    const html = this.buildOrderCreatedTemplate(orderId, status, payload);

    const options = {
      from: 'Ecommerce <ketigelovani@gmail.com>',
      to,
      subject: `Order Status Update: ${orderId}`,
      text: `Your order ${orderId} has been updated to ${status}.`,
      html,
    };

    await this.emailService.sendMail(options);
    return 'sent successfully';
  }
}