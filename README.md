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


**:exclamation: If you make a change on the server and push these from it, remember to delete the .netrc file that's used to self update the app with readonly rights on the repo which prevents you from pushing**

##Cups configuration
###Intermec driver:
At the time of writing, we are using Intermec PC43d thermal printers for delivery forms and comformity labels.

**:exclamation: Important: Remember to set the start adjust to -15mm on the printer, if the label appears cut, or that it prints 2 labels, check this parameter before anything else**

The thermal printers driver is not installed by default, you need to install it by doing the following:

- Make sure all the drivers dependencies are installed

```bash
sudo apt-get install cups automake autoconf gcc ghostscript poppler-utils netpbm
```
- copy the default config file in cups

```bash
sudo cp config/default_cupsd.conf /etc/cups/cupsd.conf
```
- Install driver
```bash
#Un-pack the driver package in directory of choice:
tar xvf ressources/cups_driver.tar.gz
#Enter the new extracted directory:
cd ressources/cupsdriver-1.1-53
#From there only one command is needed:
./build.sh
```

### Installing the printer
Get the printer ip on the intermec display: `Home > settings > communications > ipv4`

####adding the printer in the cups web interface (http://{machine_ip}:631)

- add a printer
- choose lpt/lpr
- enter  lpd://{printer_ip}/queue
- choose manufacturer : intermec
- choose model: intermec pc43d
- media size: custom
- unit: mm, width & height = 50mm
- click "set default options" button

The printer is now installed and ready to work, try to launch a test print to make sure it works
##Print server Installation
```bash
git clone https://github.com/lunettespourtous/lpt-print-client
cd lpt-print-client
#(please ignore chai, chai-fs errors they aren't harmful and only related to tests)
npm install
# Check if all the tests pass prior to launching the server
npm test
# Then start the app
# Note that pm2 launches the app and creates a startup script, so it's not necessary to relaunch the server when the machine reboots, you can check the status of the app using 'pm2 list'
npm start
```
add the following in a .env file at the folder root or in your environment variables

```
AWS_ACCESS_KEY_ID=ID_AWS
AWS_SECRET_ACCESS_KEY=MOT_DE_PASSE_AWS
GITHUB_BOT_PASS=MOT_DE_PASSE: lpt-self-update
```
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
