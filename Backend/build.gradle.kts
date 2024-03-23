plugins {
	java
	id("org.springframework.boot") version "3.2.3"
	id("io.spring.dependency-management") version "1.1.4"
}

group = "com.autoInsightProDatabase"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	// https://mvnrepository.com/artifact/mysql/mysql-connector-java
	implementation("mysql:mysql-connector-java:8.0.33")

//	implementation ("com.opencsv:opencsv:5.2")
	implementation("com.opencsv:opencsv:5.9")
	// https://mvnrepository.com/artifact/com.google.code.gson/gson
	implementation("com.google.code.gson:gson:2.10.1")

	implementation ("org.json:json:20210307")






}

tasks.withType<Test> {
	useJUnitPlatform()
}
