import emailjs, { EmailJSResponseStatus, init } from 'emailjs-com';

export const initialiseEmail = (): boolean => {
    const userId = process.env.REACT_APP_EMAIL_USER_ID;
    if (!userId) return false;
    init(userId);
    return true;
};

type EmailResponse = {
    result?: string;
    error?: {
        type: string;
        message: string;
    };
};

export type EmailParams = {
    fromName: string;
    toName: string;
    message: string;
};

export const sendEmail = async (params: EmailParams): Promise<EmailResponse> => {
    const serviceId = process.env.REACT_APP_EMAIL_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAIL_TEMPLATE_ID;

    if (serviceId === undefined || templateId === undefined) {
        return {
            error: {
                type: 'missing_id',
                message: `Missing ${serviceId === undefined ? serviceId : ''}/${
                    templateId === undefined ? templateId : ''
                } in environment`,
            },
        };
    }

    const result: EmailJSResponseStatus | string = await emailjs.send(serviceId, templateId).catch((e) => e.text);

    if (typeof result === 'string') {
        return {
            error: {
                type: 'send_email_error',
                message: result,
            },
        };
    }

    return {
        result: result.text,
    };
};
