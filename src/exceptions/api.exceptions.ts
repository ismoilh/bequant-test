import { ApiErrorResponse } from './dto';

const errorText: Record<string, string> = {
    API_ERROR_ACCESS_DENIED: 'Access denied',
    API_ERROR_WRONG_APP_KEY: 'Wrong API app key',
    API_ERROR_INCORRECT_INPUT_DATA: 'Please check the entered data',
    API_ERROR_INTERNAL_SERVER_ERROR: 'Problem with processing your request',
    API_ERROR_WRONG_INPUT: 'Wrong input data',
    API_ERROR_WRONG_INPUT_TEXT: 'Invalid text data, please do not use special characters',
    API_ERROR_INCORRECT_EMAIL_OR_PASSWORD: 'Incorrect Email Or Password',
    API_ERROR_USER_NOT_FOUND_BY_EMAIL: 'This Email Is Not Registered',
    API_ERROR_WRONG_INPUT_EMAIL: 'Enter valid email address (ex. name@email.com)',
    API_ERROR_WRONG_INPUT_PASSWORD: 'Password is not strong enough',
    API_ERROR_WRONG_INPUT_PHONE: 'Enter valid phone number in the international format (ex. +11234567890)',
    API_ERROR_NOT_IMPLEMENTED: 'API is not implemented on server side',
    API_ERROR_EMAIL_ALREADY_REGISTERED: 'Email is already registered. Please check the entered data',
    API_ERROR_USER_CREDENTIAL_NOT_FOUND: 'This user do not have password',
    API_ERROR_EMAIL_ALREADY_VERIFIED: 'Your email is already verified',
    API_ERROR_PASSWORD_NOT_MATCH: 'You’ve entered an incorrect current password',
    API_ERROR_OTP_CODE_EXPIRED: 'Your verification code is incorrect or has expired, please request a new one',
    API_ERROR_WRONG_PASSWORD_RECOVERY_TOKEN: 'Recovery token is wrong',
    API_ERROR_PASSWORD_RECOVERY_TOKEN_EXPIRED:
        'Your recovery token is incorrect or has expired, please request a new one',
    API_ERROR_USER_EMAIL_IS_NOT_VERIFIED: 'You should verify your email first',
    API_ERROR_ACCOUNT_INACTIVE: 'This account is no longer active',
    API_ERROR_IMAGE_FILE_REQUIRED: 'Please select an image file',
    API_ERROR_WRONG_IMAGE_FORMAT: 'Your image should be .JPG or .PNG format',
    API_ERROR_FILE_TOO_LARGE: 'The file is too large',
    API_ERROR_EMAIL_INCORRECT: 'Email is incorrect. Please check the entered data.',
    API_ERROR_USER_NOT_FOUND: 'User not found',
    API_ERROR_EMAIL_WRONG: 'Email is incorrect. Please check the entered data.',
    API_ERROR_WRONG_BIRTHDAY_DATE: 'The birthday date is incorrect, please check your date',
    API_ERROR_WRONG_WEIGHT_INPUT: 'Weight must not be less than 30 or higher 300, please check your data',
    API_ERROR_ALREADY_FRIENDS: 'Already friends',
    API_ERROR_ANOTHER_REQUEST_EXISTS: 'Please reply to the backward request',
    API_ERROR_WRONG_INPUT_DATE: 'The date is incorrect or cannot be in past',
    API_ERROR_USER_GOAL_ID_NOT_FOUND: 'Your goal id not found',
    API_ERROR_SUBSCRIPTION_ALREADY_REGISTERED: 'Subscription already registered, please check your data',
};

const translate = (key: string): string => {
    if (errorText[key]) {
        return errorText[key];
    } else {
        return key;
    }
};

// Api Error Code
export enum ApiEC {
    AccessDenied = 1,
    WrongAppKey = 2,
    InternalServerError = 3,
    WrongInput = 4,
    UserNotFoundByEmail = 5,
    UserNotFound = 6,
    IncorrectEmailOrPassword = 7,
    EmailAlreadyRegistered = 8,
    UserCredentialNotFound = 9,
    EmailAlreadyVerified = 10,
    PasswordNotMatch = 11,
    OTPCodeExpired = 12,
    WrongPasswordRecoveryToken = 13,
    PasswordRecoveryTokenExpired = 14,
    UserEmailIsNotVerified = 15,
    AccountInactive = 16,
    ImageFileRequired = 17,
    WrongImageFormat = 18,
    FileTooLarge = 19,
    EmailWrong = 20,
    AlreadyFriends = 21,
    AnotherRequestExists = 22,
    WrongInputDate = 23,
    UserGoalIdNotFound = 24,
    SubscriptionAlreadyRegistered = 25,
}

export class ApiException extends Error {
    private readonly errorCode: ApiEC;

    constructor(errorCode: ApiEC, message?: string) {
        super(message ?? ApiException.defaultMessageKeyForErrorCode(errorCode));
        this.errorCode = errorCode;
    }

    toErrorDTO(): ApiErrorResponse {
        const title = ApiException.titleForErrorCode(this.errorCode);
        const body = this.message ?? ApiException.bodyForErrorCode(this.errorCode);
        return {
            errorCode: this.errorCode,
            title: title ? translate(title) : undefined,
            message: translate(body),
            isForceLogout: ApiException.isForceLogoutErrorCode(this.errorCode),
        };
    }

    private static isForceLogoutErrorCode(errorCode: ApiEC): boolean {
        return errorCode === ApiEC.AccessDenied;
    }

    private static defaultMessageKeyForErrorCode(errorCode: ApiEC): string {
        switch (errorCode) {
            case ApiEC.InternalServerError:
                return 'API_ERROR_INTERNAL_SERVER_ERROR';
            case ApiEC.WrongAppKey:
                return 'API_ERROR_WRONG_APP_KEY';
            case ApiEC.AccessDenied:
                return 'API_ERROR_ACCESS_DENIED';
            case ApiEC.WrongInput:
                return 'API_ERROR_WRONG_INPUT';
            case ApiEC.IncorrectEmailOrPassword:
                return 'API_ERROR_INCORRECT_EMAIL_OR_PASSWORD';
            case ApiEC.UserNotFoundByEmail:
                return 'API_ERROR_USER_NOT_FOUND_BY_EMAIL';
            case ApiEC.EmailAlreadyRegistered:
                return 'API_ERROR_EMAIL_ALREADY_REGISTERED';
            case ApiEC.UserCredentialNotFound:
                return 'API_ERROR_USER_CREDENTIAL_NOT_FOUND';
            case ApiEC.EmailAlreadyVerified:
                return 'API_ERROR_EMAIL_ALREADY_VERIFIED';
            case ApiEC.PasswordNotMatch:
                return 'API_ERROR_PASSWORD_NOT_MATCH';
            case ApiEC.OTPCodeExpired:
                return 'API_ERROR_OTP_CODE_EXPIRED';
            case ApiEC.WrongPasswordRecoveryToken:
                return 'API_ERROR_WRONG_PASSWORD_RECOVERY_TOKEN';
            case ApiEC.PasswordRecoveryTokenExpired:
                return 'API_ERROR_PASSWORD_RECOVERY_TOKEN_EXPIRED';
            case ApiEC.UserEmailIsNotVerified:
                return 'API_ERROR_USER_EMAIL_IS_NOT_VERIFIED';
            case ApiEC.AccountInactive:
                return 'API_ERROR_ACCOUNT_INACTIVE';
            case ApiEC.ImageFileRequired:
                return 'API_ERROR_IMAGE_FILE_REQUIRED';
            case ApiEC.WrongImageFormat:
                return 'API_ERROR_WRONG_IMAGE_FORMAT';
            case ApiEC.UserNotFound:
                return 'API_ERROR_USER_NOT_FOUND';
            case ApiEC.FileTooLarge:
                return 'API_ERROR_FILE_TOO_LARGE';
            case ApiEC.EmailWrong:
                return 'API_ERROR_EMAIL_WRONG';
            case ApiEC.AlreadyFriends:
                return 'API_ERROR_ALREADY_FRIENDS';
            case ApiEC.AnotherRequestExists:
                return 'API_ERROR_ANOTHER_REQUEST_EXISTS';
            case ApiEC.WrongInputDate:
                return 'API_ERROR_WRONG_INPUT_DATE';
            case ApiEC.UserGoalIdNotFound:
                return 'API_ERROR_USER_GOAL_ID_NOT_FOUND'
            case ApiEC.SubscriptionAlreadyRegistered:
                return 'API_ERROR_SUBSCRIPTION_ALREADY_REGISTERED';
        }

        return '';
    }

    private static titleForErrorCode(errorCode: ApiEC): string | null {
        switch (errorCode) {
            case ApiEC.IncorrectEmailOrPassword:
                return 'API_ERROR_INCORRECT_EMAIL_OR_PASSWORD';
            case ApiEC.UserNotFoundByEmail:
                return 'API_ERROR_USER_NOT_FOUND_BY_EMAIL';
        }

        return null;
    }

    private static bodyForErrorCode(errorCode: ApiEC): string {
        switch (errorCode) {
            case ApiEC.IncorrectEmailOrPassword:
            case ApiEC.UserNotFoundByEmail:
                return 'API_ERROR_INCORRECT_INPUT_DATA';
        }

        return ApiException.defaultMessageKeyForErrorCode(errorCode);
    }
}
