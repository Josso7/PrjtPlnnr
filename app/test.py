import datetime
import time
import math

date_now = datetime.datetime.now().timestamp()
print(date_now)
time.sleep(3)
date_later = datetime.datetime.now().timestamp()
print(math.floor(date_later - date_now))
