package com.tutaller.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
public class TutallerApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TutallerApiApplication.class, args);
	}

}
