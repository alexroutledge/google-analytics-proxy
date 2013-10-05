Google Analytics Proxy
======================

Introduction
----

YQL is a service that enables you to access and combine multiple sources of publically available data via a SQL-like syntax.

The YQL GA Proxy allows you to publish data from the Google Analytics API via a publically accessible REST url. You can use the webservice to create custom dashboards, widgets or to create product/search recommendation or autosuggest algorithms. The service works with the following core reporting, real time reporting and multi-channel funnels reporting APIs.

Features
----

##### Scalability

The YQL GA Proxy handles all authentication so you do not need to use the Google Python or Java OAuth APIs. It is therefore possible to create a purely client side application without any server side components.

##### Caching

You can use YQL to cache any requests. By utilising YQL's caching infrastructure, you can cache requests to effectively manage your quota.

##### Mixins

One of the major benefits of using the YQL GA Proxy is that you can merge the data from the GA API with other data sources. As an example, you can create a recommendations algorithm that merges data from the GA API with products that have also been shared on social media platforms.

Assumptions
----

This app assumes you have the following:

* A basic knowledge of the Google Analytics and YQL APIs
* A Google account
* A Yahoo account
* A registered Google Analytics API project and the associated environment variables

Overview
----

##### A sample user flow would be:

* User obtains a refresh token
* User exchanges the refresh token for an access token via the Google OAuth API (the refresh token is valid for 60 mins and will be cached for this period of time)
* User is able to make authenticated requests to the GA API

##### Getting started

* After you've created an API project, make a note of the following for your project:

* 'client_id' - should always be set to the value in the API console
* 'client_secret' - should always be set to the value in the API console
* 'refresh_token' - should always be set to the value in the API console
* 'grant_type' - should always be set to 'refresh_token'
* 'scope' - should always be set to 'https://www.googleapis.com/auth/analytics.readonly'
* Open the 'google.analytics.xml' file
* Update the table/bindings/select/inputs node of the query with the required inputs. An example is shown below.

```sh
<inputs>
  <key id="ids" type="xs:string" paramType="query" default="ga:123456" required="true"/>
  <key id="dimensions" type="xs:string" paramType="query"/>
  <key id="metrics" type="xs:string" paramType="query" default="ga:visitors" required="true"/>
  <key id="filters" type="xs:string" paramType="query"/>
  <key id="sort" type="xs:string" paramType="query"/>
  <key id="start-date" as="start" type="xs:string" paramType="query" default="2013-10-04" required="true"/>
  <key id="end-date" as="end" type="xs:string" paramType="query" default="2013-10-04" required="true"/>
  <key id="max-results" as="max" type="xs:string" paramType="query"/>
  <key id="auth" paramType="variable" required="true"/>
</inputs>
```

* Make a CURL request as per below. Note, you will need to replace the values above with their correct values:

```sh
http://query.yahooapis.com/v1/public/yql/
q: 'USE "path_to/google.analytics.xml" as ga; SELECT * from ga where auth IN (SELECT access_token from ga where client_id = 'client_id' and client_secret = 'client_secret' and refresh_token = 'refresh_token' and grant_type = 'grant_type' and scope = 'scope');'
format: 'json' || 'xml'
```

* You'll notice that thus request works correctly but all the environment variables are visible to any users. Instead, we should use query aliases to hide all environment variables.

Using YQL query aliases
----

* Go to http://developer.yahoo.com/yql/console/

* Copy and paste the following query into the textarea and click on 'Create Query Alias':

```sh
'USE "path_to/google.analytics.xml" as ga; SELECT * from ga where auth IN (SELECT access_token from ga where client_id = 'client_id' and client_secret = 'client_secret' and refresh_token = 'refresh_token' and grant_type = 'grant_type' and scope = 'scope');'
```

* Select an alias and click 'next'

* The YQL console will now show you the generated URL, e.g:

```sh
http://query.yahooapis.com/v1/public/yql/{{username}}/{{query}}
```

* To use the query, you simply need to append a valid 'format' query string parameter, e.g.:

```sh
http://query.yahooapis.com/v1/public/yql/{{username}}/{{query}}?format=json
```

Caching requests
----

* To cache a request, you simply need to append the '_maxage' parameter to the URL. The parameter value should be populated with the length of time that the request should be cached for, e.g.:

```sh
http://query.yahooapis.com/v1/public/yql/{{username}}/{{query}}?format=json&_maxage=3600
```

Using the real time API
----

* Update the table/bindings/select/urls/url node of the query to 'https://www.googleapis.com/analytics/v3/data/realtime' instead of 'https://www.googleapis.com/analytics/v3/data/ga', e.g.:

```sh
<urls>
  <url>https://www.googleapis.com/analytics/v3/data/realtime</url>
</urls>
```
