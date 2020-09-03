# express proxy

Proxy HTTP Server to workaround CORS.


## How about security?

You should specify confidential credentials (such as client ID, app ID, password...etc) in this project since this project is deployed onto server side.

Browser side apps call this proxy to workaround CORS. It is secure because there is no confidential credentials saved on client side code.
