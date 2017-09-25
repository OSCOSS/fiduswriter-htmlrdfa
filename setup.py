import os
from setuptools import find_packages, setup

with open(os.path.join(os.path.dirname(__file__), 'README.md')) as readme:
    README = readme.read()

os.chdir(os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir)))

setup(
    name='fiduswriter-htmlrdfa',
    version='3.3.0-dev.0',
    packages=find_packages(),
    include_package_data=True,
    license='AGPL License',
    description='A Fidus Writer plugin to export HTML+RDFa files.',
    long_description=README,
    url='https://github.com/fiduswriter/fiduswriter-htmlrdfa',
    author='Afshin Sadeghi',
    author_email='sadeghi@cs.uni-bonn.de',
    classifiers=[
        'Environment :: Web Environment',
        'Framework :: Django',
        'Framework :: Django :: 1.11',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: GNU Affero General Public License v3',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
    ],
)
