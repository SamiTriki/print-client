# Printing #

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
