import com.github.gradle.node.npm.task.NpmTask
import org.springframework.boot.gradle.tasks.bundling.BootJar

plugins {
    id("com.github.node-gradle.node") version "3.2.0"
}

project(":profile-dashboard:frontend") {
    val dashboardDir = "${project.rootDir}/profile-dashboard"
    val frontendDir = "${dashboardDir}/frontend"
    val backendDir = "${dashboardDir}/backend"

    apply(plugin = "com.github.node-gradle.node")

    node {
        version.set("20.0.0")
        npmVersion.set("9.6.4")
    }

    tasks.clean {
        delete("${frontendDir}/build/")
        delete("${backendDir}/src/main/resources/static/")
    }

    tasks.register<NpmTask>("npmBuild") {
        workingDir.set(file(frontendDir))
        npmCommand.set(listOf("run", "build"))
    }

    tasks.register<Copy>("moveBuild") {
        from("${frontendDir}/build/")
        into("${backendDir}/src/main/resources/static/")
    }

    tasks.register("prodBuild") {
        val clean = tasks["clean"]
        val npmBuild = tasks["npmBuild"]
        val moveBuild = tasks["moveBuild"]

        npmBuild.mustRunAfter(clean)
        moveBuild.mustRunAfter(npmBuild)

        dependsOn(clean, npmBuild, moveBuild)
    }
}

project(":profile-dashboard:backend") {
    val developOnly: Configuration by configurations.creating

    configurations {
        runtimeClasspath {
            extendsFrom(developOnly)
        }
        compileOnly {
            extendsFrom(configurations.annotationProcessor.get())
        }
    }

    dependencies {
        implementation("org.springframework.boot:spring-boot-starter-jdbc")
        //하둡 버전 맞춰야 함s
//        implementation("org.apache.hadoop:hadoop-common:2.10.1"){
//            exclude("org.slf4j","slf4j-log4j12")
//        }
        implementation("org.apache.hadoop:hadoop-common:2.7.3"){
            exclude("org.slf4j","slf4j-log4j12")
        }
        compileOnly("javax.servlet:javax.servlet-api:4.0.1")

        //hive 버전 맞춰야 함
        implementation("org.apache.hive:hive-jdbc:1.2.1"){
            exclude("org.slf4j","slf4j-log4j12")
            exclude("org.apache.logging.log4j","log4j-slf4j-impl")
            exclude("org.eclipse.jetty.aggregate","jetty-all")
        }
//        implementation("org.apache.hive:hive-jdbc:2.3.9"){
//            exclude("org.slf4j","slf4j-log4j12")
//            exclude("org.apache.logging.log4j","log4j-slf4j-impl")
//            exclude("org.eclipse.jetty.aggregate","jetty-all")
//        }




//        implementation("org.springframework.boot:spring-boot-starter-data-jpa")
//        implementation("org.springframework.boot:spring-boot-starter-security") // 로긴 필요할 경우에만 사용
        implementation("org.apache.poi:poi-ooxml:4.1.1")
        developOnly("org.springframework.boot:spring-boot-devtools")
    }

    tasks.getByName<BootJar>("bootJar") {
        archiveBaseName.set("profile-location")
    }

    tasks.register("prodBuild") {
        val frontendProdBuild = project(":profile-dashboard:frontend").tasks["prodBuild"]
        val clean = tasks["clean"]
        val build = tasks["build"]

        clean.mustRunAfter(frontendProdBuild)
        build.mustRunAfter(clean)

        dependsOn(frontendProdBuild, clean, build)
    }
}
