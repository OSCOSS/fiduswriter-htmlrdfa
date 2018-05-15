# fiduswriter-htmlrdfa
HTML RDFa export filter for Fidus Writer compatible with version 3.3

## Installing plugin fiduswriter-htmlrdfa


#### Step 1:

Create a folder and clone necessary folders from git repo

For fiduswriter master branch
```
git clone -b master https://github.com/fiduswriter/fiduswriter.git
```
For fiduswriter-htmlrdfa plugin
```
git clone https://github.com/fiduswriter/fiduswriter-htmlrdfa.git
```

#### Step 2:

Installation and setup as per instructions given in https://github.com/fiduswriter/fiduswriter/wiki/Installation-on-Ubuntu

(The details of the following commands are given in the above link)
```
sudo apt-get install python-virtualenv
virtualenv venv
source venv/bin/activate
sudo apt-get install libjpeg-dev python-dev gettext zlib1g-dev git npm nodejs nodejs-legacy
cd fiduswriter
pip install -r requirements.txt
./manage.py init
./manage.py createsuperuser
./manage.py runserver
```


#### Step 3:

Start firefox. Login to check if everything is working fine.
Create new document and check the export dropdown. It should looks something like the screenshot below.

![Alt](/screenshots/image_0.png "Title")

#### Step 4:

Creation of plugin as per instruction in https://github.com/fiduswriter/fiduswriter/wiki/Develop-a-plugin

Create the link to the app holder within the fiduswriter-htmlrdfa plugin repo
```
ln -s ../fiduswriter-htmlrdfa/htmlrdfa-exporter/ ./
```
Rename configuration.py-default to configuration.py

Go to
```
INSTALLED_APPS += (
	# .....
)
```

Add 'htmlrdfa-exporter',
```
INSTALLED_APPS += (
      'htmlrdfa-exporter',
	# .....
)
```



Transpile
```
./manage.py transpile
```
Run
```
./manage.py runserver
```
Start firefox
Create document to check the export dropdown. It should look as the screenshot below.

![Alt](/screenshots/image_1.png "Title")

Add Title, a couple of lines and an image.

Click export > HTML+RDfa

Save the zipped file to disk

Extract and open the file.
