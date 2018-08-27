# AdFormify
A simple tool based on selenium to automate upload/download process on Adform studio  

## Installation  
```npm install -g``` to install.

## Usage
You need zip files of your banners under root folder where you execute ```adformify```command. **Do not forget to banner sizes in zip file names to get sizes automatically!**

1. Start terminal
2. ```cd /folder/path/to/your/zip_files```
3. Type ```adformify```

## Options
There are 4 different options that you can define when you execute the command.  
- target
- cta
- tasks 
- delay

### target
To define target folder. Default is root folder where the command is executed. Default is ```./files```  
ex: ```adformify --target=files/zip```

### cta
To define CTA url that will be written in adform studio. Default is ```https://www.google.se```  
ex: ```adformify --cta=https://www.my_cta_link.com```

### tasks
To define how many tasks will be executed simultaneously. Default is 2.  
ex: ```adformify --tasks=5```  
##### NOTE: If you have so many simutaneous tasks, the upload process may fail!

### delay (ms)
To define delay during the upload process. Default is 0. If you have a slow internet connection this helps to prevent process failure. Defined as milliseconds.  
ex: ```adformify --delay=1000```
