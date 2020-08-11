
import { IMailService, IMailTransmissionResult } from "../../models/MailService";
import { Mail } from "../../models/Mail";

export class MailGunEmailService implements IMailService {
  private mailClient: any;

  constructor(mailGunClient: any) {
    this.mailClient = mailGunClient    
  }

  async sendMail (email: Mail): Promise<IMailTransmissionResult> {
    const data = {
      from: email.sourceAddress.email,
      to: email.destinationAddress.email,
      subject: email.messageTitle,
      text: email.messageBody,
    };
    
    try {
      await this.mailClient.messages().send(data);
      return { message: 'Success', success: true }
      
    } catch (err) {
      console.log(err)
      return { message: err.toString(), success: false }
    }
  }
}

