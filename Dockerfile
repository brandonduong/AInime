# Importing JDK and copying required files
FROM openjdk:17-jdk AS build
COPY . .
RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

# Stage 2: Create the final Docker image using OpenJDK 19
FROM openjdk:17-jdk
# Copy the JAR from the build stage
COPY --from=build /target/demo-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-Dspring.profiles.active=render","-jar","app.jar"]