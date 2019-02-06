# linux-intel-undervolt-gui

The purpose of this project is to provide an electron powered front-end for undervolting certain intel CPUs.

![alt text](https://i.imgur.com/7ZJWxeO.png)

## Getting Started

Head to the release page and find a package suitable for your distro

### Prerequisites

Python


### Installing

This application uses a python script to talk to the hardware, the python script (undervolt.py) must be copied to your /home/ folder. You can also install the script globally and the app will detect this, to do this:

```sudo apt install python3-pip```

```sudo -H pip3 install undervolt```



## Built With

* [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) - Framework for building desktop apps quickly



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

This project uses the python script from:

https://github.com/georgewhewell/undervolt

Therefore your system must be compatible with that in order for this to work. Please read through the documentation there to make sure you understand how and what this is doing and if your system is compatible.

The above python project uses the information provided by the reverse engineering efforts of Miha Eleršič here:

https://github.com/mihic/linux-intel-undervolt


