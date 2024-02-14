# Operational concepts

## Administration

### Configuration

The Portal can be configured using two methods:

### appsettings.json

If you build the Portal, you can modify the appsettings.json for each backend service, to individually configure to a certain extend. This file contains all possible config entries for the application.

### Helm Chart

The most relevant config properties are exposed as environment variables and must be set in the Helm chart so the application can run at all. Check the Portal Helm chart in Git for all available variables.

### DB Migration File

Static Data migration files provide a certain configuration possibility by adding or deleting static data records before the deployment. Be aware that touching static data files will always impact the application business process. It is suggested to always test the application with the planned changes carefully in INT before releasing to a productive env.

## Disaster-Recovery

Note: will be added soon

## Scaling

If the number of consumers raises, the IRS can be scaled up by using more resources for the Deployment Pod. Those resources can be used to utilize more parallel threads to handle Job execution.

## Clustering

Note: will be added soon

## Logging

The portal supports application and db logging. Details are stored here: [Auditing](../Operations/Auditing.md).

## Monitoring

Currently all backend services write log entries as structural data in json format. These logs can easily be monitored. There are several options to provide a stable monitoring solution, one of them is to setup loki and grafana. In this solution loki is used as a datasource and custom dashboards can be setup in grafana to monitor the services. Some general Properties to query with grafana are:

- StatusCode - contains the status code of the response
- Elapsed - contains the time a endpoint took to response in milliseconds
- RenderedMessage - contains the log message with possible errors

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
