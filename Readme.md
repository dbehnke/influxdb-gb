# InfluxDB-gb

This is a demo of how you could wrap an existing github code base with gb (http://getgb.io/)

This contains a snapshot of InfluxDB (http://influxdb.com) and all it's dependencies vendored.

## Why not just use InfluxDB binaries?

I needed an easy way to compile influxdb since I didn't have root access to install the rpms on one of my EL6 systems.  I thought this was a good opportunity to try out GB.

## Quickstart

1.  Install go and make sure it's in your path.  Configure your default GOPATH

2.  run ./build.sh - this will install the latest version of gb and build influxdb.

3.  The binaries are in bin directory if all goes well enjoy!


