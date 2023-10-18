import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    val kotlinVersion = "1.7.20"

    kotlin("plugin.spring") version kotlinVersion
    kotlin("plugin.jpa") version kotlinVersion
    kotlin("jvm") version kotlinVersion
    id("java")
}

buildscript {
    val springBootVersion = "2.7.4"

    repositories {
        mavenCentral()
    }

    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
        classpath("io.spring.gradle:dependency-management-plugin:1.1.0")
    }
}

allprojects {
    apply(plugin = "idea")
    apply(plugin = "kotlin")

    group = "com.carrotins.profile"
    version = "0.0.1-SNAPSHOT"

    //모든 디펜던시 확인
    tasks.register("printAllDependencies", DependencyReportTask::class)

    repositories {
        mavenCentral()

    }
}

configure(listOf(project(":profile-dashboard:backend"))) {
//    val junitVersion = "5.5.0"
//    val mockitoVersion = "2.28.2"
    val kotestVersion = "5.4.2"
    val mockkVersion = "1.12.2"

    apply(plugin = "org.springframework.boot")
    apply(plugin = "io.spring.dependency-management")
    apply(plugin = "java")
    apply(plugin = "kotlin-spring")
    apply(plugin = "kotlin-jpa")

    java.sourceCompatibility = JavaVersion.VERSION_11

    dependencies {
        implementation("org.springframework.boot:spring-boot-starter-web")
        implementation("org.springframework.boot:spring-boot-starter-actuator")
        implementation("org.springframework.boot:spring-boot-starter-aop")
        implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
        implementation("org.springframework.boot:spring-boot-starter-security")
        implementation("org.springframework.boot:spring-boot-starter-jdbc")
//        implementation("org.rspringframework.boot:spring-boot-starter-data-jpa")

        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
        implementation("org.jetbrains.kotlin:kotlin-reflect")
        implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

        implementation("org.springframework.boot:spring-boot-starter-cache")
        implementation("com.github.ben-manes.caffeine:caffeine:2.9.0")

        implementation("org.springdoc:springdoc-openapi-ui:1.6.11")
        compileOnly("org.projectlombok:lombok")
        annotationProcessor("org.projectlombok:lombok")
        annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")


//        testImplementation("org.junit.jupiter:junit-jupiter:$junitVersion")
//        testImplementation("org.mockito:mockito-junit-jupiter:$mockitoVersion")
//        testImplementation("org.mockito:mockito-core:$mockitoVersion")

        testImplementation("org.springframework.boot:spring-boot-starter-test")
        testImplementation("io.kotest:kotest-runner-junit5:$kotestVersion")
        testImplementation("io.kotest:kotest-assertions-core:$kotestVersion")
        testImplementation("io.kotest:kotest-property:$kotestVersion")
        testImplementation("io.kotest.extensions:kotest-extensions-spring:1.1.2")
        testImplementation("io.mockk:mockk:$mockkVersion")
        testImplementation("org.glassfish:javax.el:3.0.0")
    }

    tasks.withType<KotlinCompile> {
        kotlinOptions {
            freeCompilerArgs = listOf("-Xjsr305=strict")
            jvmTarget = "1.8"
        }
    }

    tasks.withType<Test>().configureEach {
        useJUnitPlatform()
    }
}
