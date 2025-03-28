# ArbShot GUI. Deploy on server Ubuntu 20.04 (DigitalOcean 2GB/2CPU)

## INSTALL NODE.JS & NPM

```
sudo apt update
sudo apt install curl -y
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt-get install -y nodejs
```

##### Install Git, ArbShot GUI

```
apt-get install git-core
cd ~/
git clone https://github.com/volkovartem77/arbshot_gui.git
```

**Install all dependencies in package.json**
```
cd ~/arbshot_gui/; rm package-lock.json
sudo npm install
```

# Run app (docker)
## Install docker container
> For username **root**. If you have another username - change **root** at third line
```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
```

 Change server's IP address if necessary. \
 ```nano ~/arbshot_gui/src/server_adress.js``` \
 Press Ctrl-X, then Y, then Enter - to save it and close
 
 Create username and password for Basic-Auth  
 ```
apt install apache2-utils -y
htpasswd -c .htpasswd admin
```
then type password
 
 The next step is to build the project by the following command:\
 ```npm run build```\
 After it is built run docker\
 ```docker compose up -d```\
 And go to http://your_external_ip:8080
 
 ### Update project
 ```
cd ~/arbshot_gui
docker compose down
rm package-lock.json
git pull
```
```
npm run build
docker compose up -d
```
