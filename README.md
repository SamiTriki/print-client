# Installation #

##Requirements:
	- Ubuntu 14.X.X
	- Bash compatible shell
##Dependencies:
	- Git
	- Nodejs 5.X.X
	- Apache2
	- cups
	- cups-dev : `sudo apt-get install libcups2-dev`
	- pdfcrop (paquet linux) `sudo apt-get install texlive-extra-utils`

## Install NodeJS

```bash
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Install git, cups, apache2 and pdfcrop
```bash
sudo apt-get install cups git libcups2-dev texlive-extra-utils automake make autoconf gcc g++ ghostscript poppler-utils netpbm apache2-bin
```

## Clone the repository

```bash
git clone https://github.com/lunettespourtous/lpt-print-client ~/lpt-print-client
```

**:exclamation: If you make a change on the server and push these from it, remember to delete the .netrc file that's used to self update the app with readonly rights on the repo which prevents you from pushing**

##Cups configuration
###Intermec driver:
At the time of writing, we are using Intermec PC43d thermal printers for delivery forms and comformity labels.

**:exclamation: Important: Remember to set the start adjust to -15mm on the printer, if the label appears cut, or that it prints 2 labels, check this parameter before anything else**

The thermal printers driver is not installed by default, you need to install it by doing the following:

- copy the default config file in cups

```bash
sudo cp ~/lpt-print-client/config/default_cupsd.conf /etc/cups/cupsd.conf
sudo service cups restart
```
- Install driver
```bash
#Un-pack the driver package in directory of choice:
tar xvf ~/lpt-print-client/ressources/cups_driver.tar.gz -C ~/lpt-print-client/ressources/
#Enter the new extracted directory:
cd ~/lpt-print-client/ressources/cupsdriver-1.1-53
#From there only one command is needed:
./build.sh
```

### Installing the printer
Get the printer ip on the intermec display: `Home > settings > communications > ipv4`

####adding the printer in the cups web interface (http://{machine_ip}:631)

- add a printer
- The username and password are those of your user account
- choose lpt/lpr
- enter  lpd://{printer_ip}/queue
- choose manufacturer : intermec
- choose model: intermec pc43d (300dpi)
- media size: custom
- unit: mm, width & height = 50mm
- click "set default options" button

The printer is now installed and ready to work, try to launch a test print to make sure it works

## Configuration

add the following in a .env file at the folder root or in your environment variables

```
AWS_ACCESS_KEY_ID=AWS_ID
AWS_SECRET_ACCESS_KEY=AWS_PASSWORD
GITHUB_BOT_PASS=LPT_SELF_UPDATE_PASSWORD
```

##Print server Installation
```bash
cd ~/lpt-print-client
#(please ignore chai, chai-fs errors they aren't harmful and only related to tests)
npm install
# Check if all the tests pass prior to launching the server
npm test
```

```bash
# Then start the app
# Note that pm2 launches the app and creates a startup script, so it's not necessary to relaunch the server when the machine reboots, you can check the status of the app using 'sudo pm2 list'
#Launch the app through pm2 ecosystem.json, copy the sample file in the project directory
cp sample_ecosytem.json ecosystem.json
sudo npm install pm2 -g
# Edit the ecosystem.json file to make sure the app.js path is the good one
vim ecosystem.json
sudo npm start
```

If there is an error with pm2 while starting the app, try this command from the project directory:
```bash
#it will reset the configuration for you in case any path changes and on first install
node managers/configuration-manager.js reset
sudo pm2 delete lpt-print-client
```
:exclamation: Make sure the project is in a place where you have access rights to files !
# Printing Api #

add the field `no_print: true` to any request so you can save a forest or two :deciduous_tree:

## Label

	POST /print/label

Will print conformity labels on the 'label' printer, and returns the printer job id

### Mandatory parameters

- `type` : Type of label within ['certified', 'not_certified']
- `order_id` : Unique identifier of the order
- `customer_name` : String containing first and last name of the customer
- `manufacturer_name` : Name of the operator
- `reason` : (mandatory for 'not _certified' labels)
- `manufacturing` : Place where the order is made
- `destination` : Place where the order is going to


```javascript
// example
{
	type: 'not_certified',
	order_id: 1234567891011,
	customer_name: 'Jean Dupont',
	manufacturer_name: 'Jean-Michel Monteur',
	reason: 'Problème de péniche',
	manufacturing: 'Atelier Paris',
	destination: 'Magasin Paris'
}
```
## Document

	POST /print/document

Will print the following file to the registered 'invoice' printer, returns the printer Job ID

### Mandatory parameters

- `path` : Path to an aws hosted file (from bucket lpt-commandes)
```javascript
// example
{path: 'paris1/105280/commande_fabrication_105280.pdf'}
```
## Delivery

	POST /print/delivery

Will print delivery labels to the registered 'label' printer

### Mandatory parameters

- `path` : Path to an aws hosted file (from bucket lpt-commandes)
```javascript
// example
{path: 'paris1/105280/chronopost_6561XYFH4.pdf'}
```
