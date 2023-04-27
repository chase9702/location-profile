import com.github.gradle.node.npm.task.NpmTask
import org.springframework.boot.gradle.tasks.bundling.BootJar

plugins {
    id("com.github.node-gradle.node") version "3.2.0"
}

project(":control-tower:frontend") {
    val dashboardDir = "${project.rootDir}/control-tower"
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

project(":control-tower:backend") {
    val developmentOnly: Configuration by configurations.creating

    configurations {
        runtimeClasspath {
            extendsFrom(developmentOnly)
        }
        compileOnly {
            extendsFrom(configurations.annotationProcessor.get())
        }
    }

    dependencies {
//        implementation("org.springframework.boot:spring-boot-starter-jdbc")
//        implementation("org.springframework.boot:spring-boot-starter-data-jpa")
        implementation("org.springframework.boot:spring-boot-starter-security")
        implementation("org.springframework.boot:spring-boot-starter-actuator")
        developmentOnly("org.springframework.boot:spring-boot-devtools")

        annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    }

    tasks.getByName<BootJar>("bootJar") {
        archiveBaseName.set("profile-location")
    }

    tasks.register("prodBuild") {
        val frontendProdBuild = project(":control-tower:frontend").tasks["prodBuild"]
        val clean = tasks["clean"]
        val build = tasks["build"]

        clean.mustRunAfter(frontendProdBuild)
        build.mustRunAfter(clean)

        dependsOn(frontendProdBuild, clean, build)
    }
}
