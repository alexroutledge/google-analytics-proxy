Google Analytics Proxy
======================

Google Analytics Proxy is a JS library that makes it really easy to work with the Google Analytics API. Use cases might include product/search recommendations/suggestions or interactive charts/graphs.

GA Proxy enables the GA API to be used in client side apps without any server side components.

As all GA API requests must be authenticated via OAuth, the GA Proxy proxies all authentication request via YQL.

An example flow might be:

-User obtains a refresh token

-User exchanges the refresh token for an access token (proxied requestd via YQL)

-User is able to make authenticated requests to the GA API
