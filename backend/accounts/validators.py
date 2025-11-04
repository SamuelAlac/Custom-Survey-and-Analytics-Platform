from django.core.exceptions import ValidationError
import re

class ContainsLetterValidator:
    def validate(self, password, user=None):
        if not any(char.isalpha() for char in password):
            raise ValidationError(
                'The password must contain at least one letter',
                code='password_no_letters'
            )
        
    def get_help_text(self):
        return 'Your password must contain at least one uppercase or lowercase letter.'
    
class ContainsNumberValidator:
    def validate(self, password, user=None):
        if not any(char.isdigit() for char in password):
            raise ValidationError(
                'The password must contain at least one number',
                code='password_no_numbers'
            )
    
    def get_help_text(self):
        return 'Your password must contain at least one number.'
    
class ContainsSpecialCharacterValidator:
    def validate(self, password, user=None):
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            raise ValidationError(
                'Password must contain at least one special characters',
                code='password_no_special'
            )
        
    def get_help_text(self):
        return 'Your password must contain at least one special characters (e.g. !@#$%^&*).'