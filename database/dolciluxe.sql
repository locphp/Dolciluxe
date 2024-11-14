CREATE TABLE `tbl_customer` (
    `cust_id` int(11) NOT NULL AUTO_INCREMENT,
    `cust_name` varchar(100) NOT NULL,
    `cust_email` varchar(100) NOT NULL,
    `cust_phone` varchar(50) NOT NULL,
    `cust_address` text NOT NULL,
    `cust_district` varchar(100) NOT NULL,
    `cust_province` varchar(100) NOT NULL,
    `cust_zip` varchar(30) NOT NULL,
    `cust_b_name` varchar(100) NOT NULL,
    `cust_b_cname` varchar(100) NOT NULL,
    `cust_b_phone` varchar(50) NOT NULL,
    `cust_b_country` int(11) NOT NULL,
    `cust_b_address` text NOT NULL,
    `cust_b_district` varchar(100) NOT NULL,
    `cust_b_province` varchar(100) NOT NULL,
    `cust_b_zip` varchar(30) NOT NULL,
    `cust_s_name` varchar(100) NOT NULL,
    `cust_s_cname` varchar(100) NOT NULL,
    `cust_s_phone` varchar(50) NOT NULL,
    `cust_s_country` int(11) NOT NULL,
    `cust_s_address` text NOT NULL,
    `cust_s_district` varchar(100) NOT NULL,
    `cust_s_province` varchar(100) NOT NULL,
    `cust_s_zip` varchar(30) NOT NULL,
    `cust_password` varchar(100) NOT NULL,
    `cust_token` varchar(255) NOT NULL,
    `cust_datetime` varchar(100) NOT NULL,
    `cust_timestamp` varchar(100) NOT NULL,
    `cust_status` int(1) NOT NULL,
    PRIMARY KEY (`cust_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_top_category` (
  `tcat_id` int(11) NOT NULL AUTO_INCREMENT,
  `tcat_name` varchar(255) NOT NULL,
  `show_on_menu` int(1) NOT NULL,
    PRIMARY KEY (`tcat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_end_category` (
    `ecat_id` int(11) NOT NULL AUTO_INCREMENT,
    `ecat_name` varchar(255) NOT NULL,
    `tcat_id` int(11) NOT NULL,
    PRIMARY KEY (`ecat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_product` (
    `p_id` int(11) NOT NULL AUTO_INCREMENT,
    `p_name` varchar(255) NOT NULL,
    `p_old_price` varchar(10) NOT NULL,
    `p_current_price` varchar(10) NOT NULL,
    `p_qty` int(10) NOT NULL,
    `p_featured_photo` varchar(255) NOT NULL,
    `p_description` text NOT NULL,
    `p_short_description` text NOT NULL,
    `p_return_policy` text NOT NULL,
    `p_total_view` int(11) NOT NULL,
    `p_is_featured` int(1) NOT NULL,
    `p_is_active` int(1) NOT NULL,
    `ecat_id` int(11) NOT NULL,
    PRIMARY KEY (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_product_photo` (
    `pp_id` int(11) NOT NULL AUTO_INCREMENT,
    `photo` varchar(255) NOT NULL,
    `p_id` int(11) NOT NULL,
    PRIMARY KEY (`pp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_customer_message` (
    `customer_message_id` int(11) NOT NULL AUTO_INCREMENT,
    `subject` varchar(255) NOT NULL,
    `message` text NOT NULL,
    `order_detail` text NOT NULL,
    `cust_id` int(11) NOT NULL,
    PRIMARY KEY (`customer_message_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;



CREATE TABLE `tbl_faq` (
    `faq_id` int(11) NOT NULL AUTO_INCREMENT,
    `faq_title` varchar(255) NOT NULL,
    `faq_content` text NOT NULL,
    PRIMARY KEY (`faq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_language` (
    `lang_id` int(11) NOT NULL AUTO_INCREMENT,
    `lang_name` varchar(255) NOT NULL,
    `lang_value` text NOT NULL,
    PRIMARY KEY (`lang_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_order` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `product_id` int(11) NOT NULL,
    `product_name` varchar(255) NOT NULL,
    `quantity` varchar(50) NOT NULL,
    `unit_price` varchar(50) NOT NULL,
    `payment_id` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_page` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `about_title` varchar(255) NOT NULL,
    `about_content` text NOT NULL,
    `about_banner` varchar(255) NOT NULL,
    `about_meta_title` varchar(255) NOT NULL,
    `about_meta_keyword` text NOT NULL,
    `about_meta_description` text NOT NULL,
    `faq_title` varchar(255) NOT NULL,
    `faq_banner` varchar(255) NOT NULL,
    `faq_meta_title` varchar(255) NOT NULL,
    `faq_meta_keyword` text NOT NULL,
    `faq_meta_description` text NOT NULL,
    `blog_title` varchar(255) NOT NULL,
    `blog_banner` varchar(255) NOT NULL,
    `blog_meta_title` varchar(255) NOT NULL,
    `blog_meta_keyword` text NOT NULL,
    `blog_meta_description` text NOT NULL,
    `contact_title` varchar(255) NOT NULL,
    `contact_banner` varchar(255) NOT NULL,
    `contact_meta_title` varchar(255) NOT NULL,
    `contact_meta_keyword` text NOT NULL,
    `contact_meta_description` text NOT NULL,
    `pgallery_title` varchar(255) NOT NULL,
    `pgallery_banner` varchar(255) NOT NULL,
    `pgallery_meta_title` varchar(255) NOT NULL,
    `pgallery_meta_keyword` text NOT NULL,
    `pgallery_meta_description` text NOT NULL,
    `vgallery_title` varchar(255) NOT NULL,
    `vgallery_banner` varchar(255) NOT NULL,
    `vgallery_meta_title` varchar(255) NOT NULL,
    `vgallery_meta_keyword` text NOT NULL,
    `vgallery_meta_description` text NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_payment` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `customer_id` int(11) NOT NULL,
    `customer_name` varchar(255) NOT NULL,
    `customer_email` varchar(255) NOT NULL,
    `payment_date` varchar(50) NOT NULL,
    `txnid` varchar(255) NOT NULL,
    `paid_amount` int(11) NOT NULL,
    `payment_method` varchar(20) NOT NULL,
    `payment_status` varchar(25) NOT NULL,
    `shipping_status` varchar(20) NOT NULL,
    `payment_id` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_photo` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `caption` varchar(255) NOT NULL,
    `photo` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `tbl_service` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `content` text NOT NULL,
    `photo` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_settings` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `logo` varchar(255) NOT NULL,
    `favicon` varchar(255) NOT NULL,
    `footer_about` text NOT NULL,
    `footer_copyright` text NOT NULL,
    `contact_address` text NOT NULL,
    `contact_email` varchar(255) NOT NULL,
    `contact_phone` varchar(255) NOT NULL,
    `contact_fax` varchar(255) NOT NULL,
    `contact_map_iframe` text NOT NULL,
    `receive_email` varchar(255) NOT NULL,
    `receive_email_subject` varchar(255) NOT NULL,
    `receive_email_thank_you_message` text NOT NULL,
    `forget_password_message` text NOT NULL,
    `total_recent_post_footer` int(10) NOT NULL,
    `total_popular_post_footer` int(10) NOT NULL,
    `total_recent_post_sidebar` int(11) NOT NULL,
    `total_popular_post_sidebar` int(11) NOT NULL,
    `total_featured_product_home` int(11) NOT NULL,
    `total_latest_product_home` int(11) NOT NULL,
    `total_popular_product_home` int(11) NOT NULL,
    `meta_title_home` text NOT NULL,
    `meta_keyword_home` text NOT NULL,
    `meta_description_home` text NOT NULL,
    `banner_login` varchar(255) NOT NULL,
    `banner_registration` varchar(255) NOT NULL,
    `banner_forget_password` varchar(255) NOT NULL,
    `banner_reset_password` varchar(255) NOT NULL,
    `banner_search` varchar(255) NOT NULL,
    `banner_cart` varchar(255) NOT NULL,
    `banner_checkout` varchar(255) NOT NULL,
    `banner_product_category` varchar(255) NOT NULL,
    `banner_blog` varchar(255) NOT NULL,
    `cta_title` varchar(255) NOT NULL,
    `cta_content` text NOT NULL,
    `cta_read_more_text` varchar(255) NOT NULL,
    `cta_read_more_url` varchar(255) NOT NULL,
    `cta_photo` varchar(255) NOT NULL,
    `featured_product_title` varchar(255) NOT NULL,
    `featured_product_subtitle` varchar(255) NOT NULL,
    `latest_product_title` varchar(255) NOT NULL,
    `latest_product_subtitle` varchar(255) NOT NULL,
    `popular_product_title` varchar(255) NOT NULL,
    `popular_product_subtitle` varchar(255) NOT NULL,
    `testimonial_title` varchar(255) NOT NULL,
    `testimonial_subtitle` varchar(255) NOT NULL,
    `testimonial_photo` varchar(255) NOT NULL,
    `blog_title` varchar(255) NOT NULL,
    `blog_subtitle` varchar(255) NOT NULL,
    `newsletter_text` text NOT NULL,
    `paypal_email` varchar(255) NOT NULL,
    `stripe_public_key` varchar(255) NOT NULL,
    `stripe_secret_key` varchar(255) NOT NULL,
    `bank_detail` text NOT NULL,
    `before_head` text NOT NULL,
    `after_body` text NOT NULL,
    `before_body` text NOT NULL,
    `home_service_on_off` int(11) NOT NULL,
    `home_welcome_on_off` int(11) NOT NULL,
    `home_featured_product_on_off` int(11) NOT NULL,
    `home_latest_product_on_off` int(11) NOT NULL,
    `home_popular_product_on_off` int(11) NOT NULL,
    `home_testimonial_on_off` int(11) NOT NULL,
    `home_blog_on_off` int(11) NOT NULL,
    `newsletter_on_off` int(11) NOT NULL,
    `ads_above_welcome_on_off` int(1) NOT NULL,
    `ads_above_featured_product_on_off` int(1) NOT NULL,
    `ads_above_latest_product_on_off` int(1) NOT NULL,
    `ads_above_popular_product_on_off` int(1) NOT NULL,
    `ads_above_testimonial_on_off` int(1) NOT NULL,
    `ads_category_sidebar_on_off` int(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_shipping_cost` (
    `shipping_cost_id` int(11) NOT NULL AUTO_INCREMENT,
    `amount` varchar(20) NOT NULL,
    PRIMARY KEY (`shipping_cost_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_shipping_cost_all` (
    `sca_id` int(11) NOT NULL AUTO_INCREMENT,
    `amount` varchar(20) NOT NULL,
    PRIMARY KEY (`sca_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_slider` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `photo` varchar(255) NOT NULL,
    `heading` varchar(255) NOT NULL,
    `content` text NOT NULL,
    `button_text` varchar(255) NOT NULL,
    `button_url` varchar(255) NOT NULL,
    `position` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_social` (
    `social_id` int(11) NOT NULL AUTO_INCREMENT,
    `social_name` varchar(30) NOT NULL,
    `social_url` varchar(255) NOT NULL,
    `social_icon` varchar(30) NOT NULL,
    PRIMARY KEY (`social_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_subscriber` (
    `subs_id` int(11) NOT NULL AUTO_INCREMENT,
    `subs_email` varchar(255) NOT NULL,
    `subs_date` varchar(100) NOT NULL,
    `subs_date_time` varchar(100) NOT NULL,
    `subs_hash` varchar(255) NOT NULL,
    `subs_active` int(11) NOT NULL,
    PRIMARY KEY (`subs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_user` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `full_name` varchar(100) NOT NULL,
    `email` varchar(255) NOT NULL,
    `phone` varchar(100) NOT NULL,
    `password` varchar(255) NOT NULL,
    `photo` varchar(255) NOT NULL,
    `role` varchar(30) NOT NULL,
    `status` varchar(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `tbl_end_category`
  ADD CONSTRAINT `tbl_end_category_ibfk_1` FOREIGN KEY (`tcat_id`) REFERENCES `tbl_top_category` (`tcat_id`);

ALTER TABLE `tbl_product`
    ADD CONSTRAINT `tbl_product_ibfk_1` FOREIGN KEY (`ecat_id`) REFERENCES `tbl_end_category` (`ecat_id`);

ALTER TABLE `tbl_product_photo`
    ADD CONSTRAINT `tbl_product_photo_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `tbl_product` (`p_id`);

ALTER TABLE `tbl_order`
    ADD CONSTRAINT `tbl_order_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `tbl_product` (`p_id`);

ALTER TABLE `tbl_payment`
    ADD CONSTRAINT `tbl_payment_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `tbl_customer` (`cust_id`);

ALTER TABLE `tbl_shipping_cost_all`
    ADD CONSTRAINT `tbl_shipping_cost_all_ibfk_1` FOREIGN KEY (`sca_id`) REFERENCES `tbl_shipping_cost` (`shipping_cost_id`);


