package miniproject.stellanex.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    EMAIL_DUPLICATED("Email duplicated!"),
    EMAIL_NOTFOUND("Email not found!"),
    INVALID_PASSWORD("Password invalid!");

    private final String message;
}
