# Events feedback form

## Deploy to IBM Cloud

### To use the same db

[![Deploy to IBM Cloud](https://cloud.ibm.com/devops/setup/deploy/button.png)](https://cloud.ibm.com/devops/setup/deploy?repository=https://github.com/rapchic/events-feedback&branch=master)

### To have a new db which you can take saved info from

1. Create a [cloudant instance](https://cloud.ibm.com/docs/Cloudant?topic=cloudant-creating-an-ibm-cloudant-instance-on-ibm-cloud)
2. Take a note of your [service credentials](https://cloud.ibm.com/docs/Cloudant?topic=cloudant-creating-an-ibm-cloudant-instance-on-ibm-cloud#the-service-credentials) that is, cloudantusername and cloudantpassword
3. Go to the .env file in this app and edit to remove existing creds and add your own

### To add a different background image

1. Go to *public->stylesheets->style.css* and add the image url inside "background-image:"
