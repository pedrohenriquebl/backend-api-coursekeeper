export declare class MailService {
    private transporter;
    constructor();
    sendPasswordReset(to: string, token: string): Promise<void>;
}
