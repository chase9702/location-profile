package com.carrotins.backend.config

//import org.apache.hadoop.security.UserGroupInformation
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.datasource.DriverManagerDataSource
import org.springframework.jmx.export.MBeanExporter
import java.util.*
import javax.sql.DataSource


/**
 * Created by alvin on 2023/05/30.
 */
@Configuration
class DataSourceConfig(
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

    @Value("\${ext.datasource.hive.jdbc-url}")
    private val jdbcUrl: String,
    @Value("\${ext.datasource.hive.driver-class-name}")
    private val driverName: String,
    @Value("\${ext.datasource.hive.username}")
    private val username: String,
    @Value("\${ext.datasource.hive.password}")
    private val password: String,



    ) {

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
    @Bean
    fun exporter(): MBeanExporter? {
        val exporter = MBeanExporter()
        exporter.setExcludedBeans(
            "hiveDataSource"
        )
        return exporter
    }

    @Primary
    @Bean(name = ["hiveDataSource"])
    fun hiveDataSource(): DataSource {
        val ds = DriverManagerDataSource()
        ds.setDriverClassName(driverName)
        ds.url = jdbcUrl
        ds.username = username
        ds.password = password
        return ds
    }

    @Bean(name = ["hiveJdbcTemplate"])
    fun hiveJdbcTemplate(
        @Qualifier("hiveDataSource") hiveDataSource: DataSource?
    ): JdbcTemplate? {
        return JdbcTemplate(hiveDataSource!!)
    }


}