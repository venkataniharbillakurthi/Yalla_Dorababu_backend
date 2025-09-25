# Portfolio Backend

This is the backend service for the portfolio application, built with Spring Boot and PostgreSQL.

## Prerequisites

- Java 17
- Maven 3.8+
- PostgreSQL 13+

## Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd portfolio/backend
   ```

2. **Set up the database**
   - Create a PostgreSQL database named `portfolio_3bvl`
   - Update `src/main/resources/application.properties` with your local database credentials

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application**
   - The application will be available at `http://localhost:8080`

## Deployment to Render

This application is configured for deployment to Render using the `render.yaml` file.

### Steps to deploy:

1. **Push your code** to a Git repository (GitHub, GitLab, or Bitbucket)

2. **Create a new Web Service** on Render
   - Connect your Git provider
   - Select your repository
   - Render will automatically detect the Java project
   - The build and start commands are pre-configured in `render.yaml`
   - Environment variables are already set in `render.yaml`

3. **Deploy**
   - Click "Create Web Service"
   - Monitor the deployment logs for any issues

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SPRING_DATASOURCE_URL` | PostgreSQL connection URL | Yes |
| `SPRING_DATASOURCE_USERNAME` | Database username | Yes |
| `SPRING_DATASOURCE_PASSWORD` | Database password | Yes |
| `JWT_SECRET` | Secret key for JWT token generation | Yes |

## API Documentation

Once the application is running, you can access the API documentation at:
- Swagger UI: `http://<your-host>/swagger-ui.html`
- OpenAPI JSON: `http://<your-host>/v3/api-docs`

## License

This project is licensed under the [MIT License](LICENSE).
