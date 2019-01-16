package com.abaiyat.vchatws;

import com.abaiyat.vchatws.io.entity.Room;
import com.abaiyat.vchatws.io.respository.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VchatWsApplication {

	public static void main(String[] args) { SpringApplication.run(VchatWsApplication.class, args);}
}

