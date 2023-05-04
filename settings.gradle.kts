pluginManagement {
    repositories {
        mavenCentral()
        gradlePluginPortal()
    }
    
}
rootProject.name = "profile-server"
include(":profile-dashboard")
include(":profile-dashboard:backend")
include(":profile-dashboard:frontend")
