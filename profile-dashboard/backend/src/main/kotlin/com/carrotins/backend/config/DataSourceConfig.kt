//package com.carrotins.backend.config
//
//import org.apache.hadoop.security.UserGroupInformation
//import org.springframework.beans.factory.annotation.Qualifier
//import org.springframework.beans.factory.annotation.Value
//import org.springframework.boot.context.properties.ConfigurationProperties
//import org.springframework.boot.jdbc.DataSourceBuilder
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.context.annotation.Primary
//import org.springframework.jdbc.core.JdbcTemplate
//import org.springframework.jdbc.datasource.DriverManagerDataSource
//import java.util.*
//import javax.annotation.PostConstruct
//import javax.sql.DataSource
//
//
///**
// * Created by alvin on 2023/05/30.
// */
//@Configuration
//class DataSourceConfig (
//    @Value("\${kerberos.jaas}")
//    private val jaasConf: String,
//
//    @Value("\${kerberos.krb5}")
//    private val krb5Conf: String,
//
//    @Value("\${kerberos.krb5}")
//    private val realm: String,
//
//    @Value("\${kerberos.krb5}")
//    private val principal: String,
//
//    @Value("\${kerberos.krb5}")
//    private val keytab: String,
//
//    ) {
//
//    @PostConstruct
//    fun initKerberos() {
//        val hadoopConf = org.apache.hadoop.conf.Configuration()
//
//        System.setProperty("java.security.auth.login.config", jaasConf)
//        System.setProperty("java.security.krb5.conf", krb5Conf)
//        System.setProperty("sun.security.krb5.debug", "false")
//        System.setProperty("zookeeper.sasl.client", "false")
//
//        hadoopConf["hadoop.security.authentication"] = "kerberos"
//        hadoopConf["hadoop.security.authorization"] = "true"
//
//        UserGroupInformation.setConfiguration(hadoopConf)
//        UserGroupInformation.loginUserFromKeytab("$principal@$realm", keytab)
//
//        val user = UserGroupInformation.getCurrentUser()
//    }
//
//    @Bean
//    @ConfigurationProperties(prefix = "ext.datasource.hive")
//    fun getProperties(): Properties {
//        return Properties()
//    }
//
//    @Primary
//    @Bean(name = ["hiveDataSource"])
//    fun hiveDataSource(): DataSource {
//        val prop = getProperties()
//        val url = prop.getProperty("jdbc-url")
//        val driver = prop.getProperty("driver-class-name")
//        val ds = DataSourceBuilder.create().type(DriverManagerDataSource::class.java).url(url).driverClassName(driver)
//            .build()
//        ds.connectionProperties = prop
//        return ds
//    }
//
//
//    @Bean(name = ["hiveJdbcTemplate"])
//    fun hiveJdbcTemplate(
//        @Qualifier("hiveDataSource") hiveDataSource: DataSource?
//    ): JdbcTemplate? {
//        return JdbcTemplate(hiveDataSource!!)
//    }
//
//
//}