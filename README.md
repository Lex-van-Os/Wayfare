# Wayfare
A hosted itinerary planner built with the MERN stack

## DevOps examples
This project includes multiple DevOps related examples and use-cases that can be tested out using the server

### Server example: Load balanced server
Through running two seperate instances of the server side application, a demonstration of a reverse proxy and load balancing can be achieved.

#### Prerequisites:
1. A configured NGINX load balancer, with the two defined ports that can be found under the `set_port` script(s)

#### Example
1. Open two seperate terminals.
2. Ensure that an example NGINX server is running with the above mentioned prerequisites.
3. Inside of the two terminals, navigate to the following directory:
   ```bash
   Wayfare/server
   ```
4. In both terminals, run the following command:
   ```bash
   npm start:lb_example
   ```
5. Both servers will start and listen for incoming requests from the defined port in your NGINX server, and will actively balance the given load.
