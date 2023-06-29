//package com.carrotins.backend.config
//
//import org.apache.hadoop.security.UserGroupInformation
//import org.springframework.beans.factory.annotation.Value
//import org.springframework.context.annotation.Configuration
//import java.util.*
//import javax.annotation.PostConstruct
//
///**
// * Created by alvin on 2023/06/27.
// */
//@Configuration
//class KerberosConfig(
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
//) {
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
//
//    }
//}