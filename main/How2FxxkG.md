1.
```
$5/month

CPU: 1 vCore
RAM: 1024 MB
Storage: 25 GB SSD
Bandwidth: 1000 GB
OS: Ubuntu 16.04 x64
```
2. ssh
3. ```$ apt-get update```
4. ```$ apt-get install python-pip```
5. ```$ pip install --upgrade pip```
6. ```$ pip install setuptools```
7. ```$ pip install shadowsocks```
8. ```$ vim /etc/shadowsocks.json```
```json
{
  "server": "0.0.0.0",
  "server_port": 1024,
  "local_address": "127.0.0.1",
  "local_port": 1080,
  "password": "whatevershit",
  "timeout": 300,
  "method": "aes-256-cfb"
}
```
9. ```$ chmod 755 /etc/shadowsocks.json```
10. ```$ apt-get install python-m2crypto```
11. ```$ ssserver -c /etc/shadowsocks.json -d start```
> ssserver -c /etc/shadowsocks.json -d stop
12. ```$ vim /etc/rc.local```
```
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.
ssserver -c /etc/shadowsocks.json -d start
exit 0
```

or

```
wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.sh
chmod +x shadowsocks-all.sh
./shadowsocks-all.sh 2>&1 | tee shadowsocks-all.log
```
