pluginManagement {
    repositories {
        mavenCentral()
        gradlePluginPortal()
    }
    
}
rootProject.name = "profile-location"
include(":control-tower")
include(":control-tower:backend")
include(":control-tower:frontend")
