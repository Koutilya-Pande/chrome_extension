import os
jwt_secret = os.urandom(64).hex()
print(jwt_secret)
