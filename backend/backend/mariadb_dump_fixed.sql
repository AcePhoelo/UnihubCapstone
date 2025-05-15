-- MariaDB dump created by SQLite to MariaDB converter
-- Created at: 2025-05-13 15:15:36
-- Original SQLite database: mydatabase_backup.sqlite3
SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = `NO_AUTO_VALUE_ON_ZERO`;
START TRANSACTION;

-- Table structure for table `django_migrations`
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE django_migrations (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `app` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `applied` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `django_migrations`
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (1, 'contenttypes', '0001_initial', '2025-04-02 05:22:34.719959');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (2, 'auth', '0001_initial', '2025-04-02 05:22:34.745954');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (3, 'admin', '0001_initial', '2025-04-02 05:22:34.764408');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (4, 'admin', '0002_logentry_remove_auto_add', '2025-04-02 05:22:34.783166');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (5, 'admin', '0003_logentry_add_action_flag_choices', '2025-04-02 05:22:34.793928');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (6, 'contenttypes', '0002_remove_content_type_name', '2025-04-02 05:22:34.820062');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (7, 'auth', '0002_alter_permission_name_max_length', '2025-04-02 05:22:34.836752');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (8, 'auth', '0003_alter_user_email_max_length', '2025-04-02 05:22:34.853435');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (9, 'auth', '0004_alter_user_username_opts', '2025-04-02 05:22:34.866153');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (10, 'auth', '0005_alter_user_last_login_null', '2025-04-02 05:22:34.883266');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (11, 'auth', '0006_require_contenttypes_0002', '2025-04-02 05:22:34.887851');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (12, 'auth', '0007_alter_validators_add_error_messages', '2025-04-02 05:22:34.899808');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (13, 'auth', '0008_alter_user_username_max_length', '2025-04-02 05:22:34.916679');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (14, 'auth', '0009_alter_user_last_name_max_length', '2025-04-02 05:22:34.932663');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (15, 'auth', '0010_alter_group_name_max_length', '2025-04-02 05:22:34.948549');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (16, 'auth', '0011_update_proxy_permissions', '2025-04-02 05:22:34.960460');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (17, 'auth', '0012_alter_user_first_name_max_length', '2025-04-02 05:22:34.976980');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (18, 'feedback', '0001_initial', '2025-04-02 05:22:34.983898');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (19, 'feedback', '0002_remove_feedback_created_at_remove_feedback_email_and_more', '2025-04-02 05:22:35.025457');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (20, 'sessions', '0001_initial', '2025-04-02 05:22:35.036465');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (21, 'profile', '0001_initial', '2025-04-17 05:24:55.015815');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (22, 'profile', '0002_alter_student_badges_alter_student_clubsjoined', '2025-04-17 05:24:55.032106');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (23, 'profile', '0003_remove_student_name_student_user', '2025-04-17 05:37:02.403555');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (25, 'clubs', '0002_club_president_member', '2025-04-17 06:18:03.467752');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (26, 'clubs', '0003_member_position', '2025-04-17 06:18:03.482123');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (27, 'clubs', '0004_member_custom_position', '2025-04-17 06:18:03.491673');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (28, 'clubs', '0005_alter_member_club', '2025-04-17 06:18:03.499088');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (29, 'profile', '0004_student_full_name_student_leadership_clubs_and_more', '2025-04-17 06:18:03.560967');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (30, 'profile', '0005_student_profile_picture', '2025-04-17 09:00:02.154894');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (31, 'clubs', '0006_auto_20250418_1216', '2025-04-18 04:27:15.293502');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (38, 'profile', '0006_auto_20250418_1215', '2025-04-19 02:38:52.738753');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (39, 'profile', '0007_remove_student_clubsjoined_and_more', '2025-04-19 02:38:52.745601');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (40, 'clubs', '0007_remove_member_club_remove_member_name_and_more', '2025-04-19 02:38:52.750465');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (41, 'clubs', '0008_alter_club_logo', '2025-04-19 02:38:52.755759');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (42, 'user_profile', '0001_initial', '2025-04-19 03:31:11.198943');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (43, 'clubs', '0001_initial', '2025-04-19 06:43:02.936824');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (45, 'user_profile', '0002_alter_student_options_alter_student_badges_and_more', '2025-04-19 08:26:49.393479');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (47, 'clubs', '0002_auto_20250419_1608', '2025-04-19 09:36:57.538072');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (48, 'clubs', '0003_club_banner_alter_club_description_alter_club_logo_and_more', '2025-04-19 13:11:16.932019');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (49, 'add_event', '0001_initial', '2025-04-21 06:05:39.850900');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (50, 'add_event', '0002_event_club_event_created_by', '2025-04-21 06:05:39.895783');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (51, 'event_page', '0001_initial', '2025-04-21 06:05:39.915057');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (52, 'event_page', '0002_alter_clubeventpage_event', '2025-04-21 06:05:39.931699');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (53, 'event_registration', '0001_initial', '2025-04-21 06:05:39.940760');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (54, 'event_registration', '0002_remove_eventregistration_curtin_id_and_more', '2025-04-21 06:05:40.001318');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (55, 'feedback', '0003_remove_feedback_name_feedback_event_and_more', '2025-04-21 06:05:40.054446');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (56, 'add_event', '0003_alter_event_created_by', '2025-05-12 04:20:37.054308');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (57, 'add_event', '0004_alter_event_banner', '2025-05-12 04:20:37.088100');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (58, 'clubs', '0004_remove_member_clubs_clubmembership_club_members', '2025-05-12 04:20:37.130446');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (59, 'clubs', '0005_delete_member', '2025-05-12 04:20:37.135791');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (60, 'clubs', '0006_alter_clubmembership_options', '2025-05-12 04:20:37.147600');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (61, 'clubs', '0007_colorpalette', '2025-05-12 04:20:37.152962');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (62, 'feedback', '0004_feedback_student', '2025-05-12 04:20:37.168330');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (63, 'feedback', '0005_alter_feedback_student', '2025-05-12 04:20:37.187995');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (64, 'user_profile', '0003_alter_student_options_student_first_name_and_more', '2025-05-12 04:20:37.229289');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (65, 'user_profile', '0004_alter_student_badges', '2025-05-12 04:20:37.247853');

-- Table structure for table `auth_group_permissions`
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE auth_group_permissions (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `group_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `auth_user_groups`
DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE auth_user_groups (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `group_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `auth_user_user_permissions`
DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE auth_user_user_permissions (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL REFERENCES `auth_user` (`id`) ,
  `permission_id` INT NOT NULL REFERENCES `auth_permission` (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `django_admin_log`
DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE django_admin_log (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `object_id` TEXT,
  `object_repr` VARCHAR(200) NOT NULL,
  `action_flag` SMALLINT UNSIGNED NOT NULL CHECK (`ACTION_FLAG` >= 0),
  `change_message` TEXT,
  `content_type_id` INT NULL REFERENCES `django_content_type` (`id`) ,
  `user_id` INT NOT NULL REFERENCES `auth_user` (`id`) ,
  `action_time` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `django_admin_log`
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (19, '3', 'Art Club', 3, '', 9, 26, '2025-04-27 07:53:54.732346');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (20, '3', 'Hans Hartowidjojo (President)', 2, '[{`changed`: {`fields`: [`Clubs`, `Position`]}}]', 10, 26, '2025-04-27 10:05:46.382281');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (21, '3', 'Hans Hartowidjojo (President)', 2, '[{`changed`: {`fields`: [`Clubs`, `Position`]}}]', 10, 26, '2025-04-27 10:19:49.842557');

-- Table structure for table `django_content_type`
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE django_content_type (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `app_label` VARCHAR(100) NOT NULL,
  `model` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `django_content_type`
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (1, 'admin', 'logentry');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (2, 'auth', 'permission');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (3, 'auth', 'group');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (4, 'auth', 'user');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (5, 'contenttypes', 'contenttype');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (6, 'sessions', 'session');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (7, 'feedback', 'feedback');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (8, 'user_profile', 'student');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (9, 'clubs', 'club');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (10, 'clubs', 'member');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (11, 'add_event', 'event');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (12, 'event_registration', 'eventregistration');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (13, 'event_page', 'clubeventpage');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (14, 'clubs', 'clubmembership');
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (15, 'clubs', 'colorpalette');

-- Table structure for table `auth_permission`
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE auth_permission (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `content_type_id` INT NOT NULL REFERENCES `django_content_type` (`id`) ,
  `codename` VARCHAR(100) NOT NULL,
  `name` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `auth_permission`
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (1, 1, 'add_logentry', 'Can add log entry');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (2, 1, 'change_logentry', 'Can change log entry');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (3, 1, 'delete_logentry', 'Can delete log entry');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (4, 1, 'view_logentry', 'Can view log entry');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (5, 2, 'add_permission', 'Can add permission');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (6, 2, 'change_permission', 'Can change permission');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (7, 2, 'delete_permission', 'Can delete permission');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (8, 2, 'view_permission', 'Can view permission');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (9, 3, 'add_group', 'Can add group');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (10, 3, 'change_group', 'Can change group');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (11, 3, 'delete_group', 'Can delete group');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (12, 3, 'view_group', 'Can view group');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (13, 4, 'add_user', 'Can add user');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (14, 4, 'change_user', 'Can change user');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (15, 4, 'delete_user', 'Can delete user');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (16, 4, 'view_user', 'Can view user');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (17, 5, 'add_contenttype', 'Can add content type');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (18, 5, 'change_contenttype', 'Can change content type');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (19, 5, 'delete_contenttype', 'Can delete content type');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (20, 5, 'view_contenttype', 'Can view content type');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (21, 6, 'add_session', 'Can add session');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (22, 6, 'change_session', 'Can change session');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (23, 6, 'delete_session', 'Can delete session');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (24, 6, 'view_session', 'Can view session');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (25, 7, 'add_feedback', 'Can add feedback');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (26, 7, 'change_feedback', 'Can change feedback');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (27, 7, 'delete_feedback', 'Can delete feedback');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (28, 7, 'view_feedback', 'Can view feedback');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (29, 8, 'add_student', 'Can add Student');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (30, 8, 'change_student', 'Can change Student');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (31, 8, 'delete_student', 'Can delete Student');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (32, 8, 'view_student', 'Can view Student');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (33, 9, 'add_club', 'Can add club');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (34, 9, 'change_club', 'Can change club');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (35, 9, 'delete_club', 'Can delete club');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (36, 9, 'view_club', 'Can view club');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (37, 10, 'add_member', 'Can add member');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (38, 10, 'change_member', 'Can change member');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (39, 10, 'delete_member', 'Can delete member');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (40, 10, 'view_member', 'Can view member');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (41, 11, 'add_event', 'Can add event');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (42, 11, 'change_event', 'Can change event');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (43, 11, 'delete_event', 'Can delete event');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (44, 11, 'view_event', 'Can view event');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (45, 12, 'add_eventregistration', 'Can add event registration');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (46, 12, 'change_eventregistration', 'Can change event registration');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (47, 12, 'delete_eventregistration', 'Can delete event registration');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (48, 12, 'view_eventregistration', 'Can view event registration');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (49, 13, 'add_clubeventpage', 'Can add club event page');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (50, 13, 'change_clubeventpage', 'Can change club event page');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (51, 13, 'delete_clubeventpage', 'Can delete club event page');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (52, 13, 'view_clubeventpage', 'Can view club event page');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (53, 14, 'add_clubmembership', 'Can add club membership');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (54, 14, 'change_clubmembership', 'Can change club membership');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (55, 14, 'delete_clubmembership', 'Can delete club membership');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (56, 14, 'view_clubmembership', 'Can view club membership');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (57, 15, 'add_colorpalette', 'Can add color palette');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (58, 15, 'change_colorpalette', 'Can change color palette');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (59, 15, 'delete_colorpalette', 'Can delete color palette');
INSERT INTO `auth_permission` (`id`, `content_type_id`, `codename`, `name`) VALUES (60, 15, 'view_colorpalette', 'Can view color palette');

-- Table structure for table `auth_group`
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE auth_group (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `auth_user`
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE auth_user (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `password` VARCHAR(128) NOT NULL,
  `last_login` DATETIME NULL,
  `is_superuser` BOOL NOT NULL,
  `username` VARCHAR(150) NOT NULL UNIQUE,
  `last_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  `is_staff` BOOL NOT NULL,
  `is_active` BOOL NOT NULL,
  `date_joined` DATETIME NOT NULL,
  `first_name` VARCHAR(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `auth_user`
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (26, 'pbkdf2_sha256$1000000$f5xAU9yN01Q9JPIZd0JuRS$ZinKbV3Pnslp/PbCjBjM1UqunG6dLsr9V+/jVSyBK8U=', '2025-05-12 04:37:19.316794', 1, '87654321', '', '87654321@student.curtin.edu.au', 1, 1, '2025-04-26 05:16:12.879528', '');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (243, 'pbkdf2_sha256$1000000$4KXkd34ORUWxdGNQtCgy0P$S0td0zM/4ghkA8trcbfsAy+MVBKN4jNZONAZ5WqucEc=', NULL, 0, '21449723', 'Hartowidjojo', '21449723@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:40.223488', 'Hans');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (244, 'pbkdf2_sha256$1000000$JMQ0hZ2k1IwmfgL6dHvaAr$vf7Nx5QUwDQdB+u+4yKG8O9Xj9lJsW3VGAj5+1pMWys=', NULL, 0, '21714670', 'Yeo', '21714670@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:40.685141', 'Kenzo');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (245, 'pbkdf2_sha256$1000000$gETNl0KyfamCVgtR1uRd5K$wHUPV1EVDTrcQak2xlKadhc/nG24ZfcnjPp/iTXwpvA=', NULL, 0, '21629004', 'Thair', '21629004@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:41.128180', 'Muhamad');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (246, 'pbkdf2_sha256$1000000$VTmmJHiWzt7E65ETqFo6Sq$vlBMvQxIsHGs1T5F9SsqUBztW+rGv6ef2SacxjTXoBI=', NULL, 0, '21610778', 'Adeliawanti', '21610778@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:41.646994', 'Clarissa');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (247, 'pbkdf2_sha256$1000000$hQmSJzX2UmxrcrszXTYuZi$dk7PvUFq4249vD6U2YsTlnxHeSWPmlCcXQDjnI38awY=', NULL, 0, '21871261', 'Danusaputro', '21871261@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:42.101747', 'Yessica');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (248, 'pbkdf2_sha256$1000000$AQ8fvA3kSsTbkjx7eNeuyq$qlODMyoyjhSkO8Fj/rNlj9+PLTS/iqcnn7zbdKKKTLg=', NULL, 0, '20850609', 'Widjaja', '20850609@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:42.552863', 'Steven');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (249, 'pbkdf2_sha256$1000000$5qhxtpUXimCYFLqZ4EmXyy$O21zSB05FAi26ML1c4Xdqs+cL2QkoU6HpM5slYoJ36Q=', NULL, 0, '21708165', 'Teruna', '21708165@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:43.030745', 'Nathan');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (250, 'pbkdf2_sha256$1000000$r2Z4bCh4KTMttvZ6OLX90O$NYfLYgDvlWZQRzdhLOcLM/85ik+O22Zy/U9TlMUnlf0=', NULL, 0, '21361322', 'Ching', '21361322@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:43.507654', 'Michelle');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (251, 'pbkdf2_sha256$1000000$cfHDySgJA0UFpQ5MViR2xQ$0in8/ncj/45mLDf+PJ3qk4g2TSsrYX0IGA3jRtaxWW0=', NULL, 0, '21832556', 'Prasetyo', '21832556@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:43.953981', 'Gregorius');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (252, 'pbkdf2_sha256$1000000$7rYVGj65y7P6d7VE1dQCRX$aCy6nmNT9yWPNMrtH2nBbhMRfprHUNbcqXUJigsrTQc=', NULL, 0, '21917372', 'Tristan', '21917372@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:44.387492', 'Noah');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (253, 'pbkdf2_sha256$1000000$jN5ZmzICO4qzhpG8iJnPJU$tbhKEMTSZlVLtOzje8QEi1m30BJ73j3VvKhWBqkgq60=', NULL, 0, '22712439', 'Sutanto', '22712439@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:44.811090', 'Stella');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (254, 'pbkdf2_sha256$1000000$T18Gas5YbOdKGG4t4SsY0C$VLwXRDei6aKgYZLrbEfpxjU5tboc7h43xIvwoAaAh18=', NULL, 0, '20673437', 'Suresh', '20673437@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:45.256229', 'Navena');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (255, 'pbkdf2_sha256$1000000$cB4X0EVMgayA7oyd8jAPL3$TKHMgCyGx0th9fbvlJaosM+OOEW1sP9BcxPfU2x3UA8=', NULL, 0, '21073614', 'Niyaz', '21073614@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:45.715870', 'Zaifa');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (256, 'pbkdf2_sha256$1000000$yIOnOo3YuRhviQHrPbOOQC$UWA4/EA2k7qzjE8qViFj8nx9PPLDGQS8TVeY8jNW5y0=', NULL, 0, '21716304', 'Tanoto', '21716304@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:46.157117', 'Evangeline');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (257, 'pbkdf2_sha256$1000000$DeUo7A0X9CIlhzYvIThTnE$ueBinif70dnhNyVN2pSS5ircuN6ZucAYcly+QZODGso=', NULL, 0, '21904442', 'Eugenia', '21904442@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:46.590763', 'Gabrielle');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (258, 'pbkdf2_sha256$1000000$RUrfofYxTraOz9x7Knt8RU$KhHbEydNmwvJEg9PpGToUMM5LFAURm1QDDZv/Olf/IM=', NULL, 0, '21691744', 'Barry', '21691744@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:47.026944', 'Sarah');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (259, 'pbkdf2_sha256$1000000$bRe4mx6yeFyXUcYi9b57p3$P/fcyldePCsh8Bsu7OXCOyaOSW7m8MHZkVi1riRu8BU=', NULL, 0, '21739699', 'Kudelina', '21739699@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:47.453182', 'Viktoriia');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (260, 'pbkdf2_sha256$1000000$9kh9XCcGCvyoTg0JGwYpli$raBUPVZEWv2q24pdoT9rUjwW+FYxnHaEZ1w9eokRYa4=', NULL, 0, '21650596', 'Chen', '21650596@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:47.874487', 'Jiale');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (261, 'pbkdf2_sha256$1000000$9MLFzU9MRq6bkgGHCszxJh$4ELYKgA2A8Cj/zOnaieGsIS+zOlIesHe9sNWuCtoe0I=', NULL, 0, '21960839', 'Changir', '21960839@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:48.320806', 'Virginia');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (262, 'pbkdf2_sha256$1000000$i9Z7fyfVipmSgMySdxNAld$Xmm3+n5vRvnK4w82O8dpQh13QmeAK1jPCAN6qwAlM8A=', NULL, 0, '21857274', 'U', '21857274@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:48.762098', 'Hou');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (263, 'pbkdf2_sha256$1000000$N1vl767E6iKyzm4Nmse9g5$FRquHxzl3SjF7/3Z/2FjS7IXixU12f57HXkL9b5gyDk=', NULL, 0, '21759244', 'Jasmine', '21759244@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:49.193448', 'Trisia');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (264, 'pbkdf2_sha256$1000000$CuZA4nzDQUqrwXZwYY0Uxi$0NhXK20EwLqk5SpdkqkFM99ELQXQre26rKalTZcqqA4=', NULL, 0, '21796568', 'Elvina', '21796568@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:49.651710', 'Pande');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (265, 'pbkdf2_sha256$1000000$Wh8X0W2iNEEsTcKVj62JUF$YupOPlgb8U68FSogUoNVbUVzurzdmLNroPP5jL8gRJo=', NULL, 0, '21329676', 'Jhonatan', '21329676@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:50.102694', 'Ayrelyn');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (266, 'pbkdf2_sha256$1000000$lnDgyvByXTN6jspSF8XCQm$yNvSfIfY8baFyL/8+G8so9KGydhZjJZmo8kz/bykr48=', NULL, 0, '21851140', 'Betaubun', '21851140@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:50.563593', 'Clarissa');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (267, 'pbkdf2_sha256$1000000$c3ukyGrSn4O3ueFwv2ttwc$pz0HaPDZAekYW91dwiiNCOpTUZxKB98180c7ZOF3h7M=', NULL, 0, '22743002', 'Tjhie', '22743002@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:51.072497', 'David');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (268, 'pbkdf2_sha256$1000000$ndlFEKHw5bjTgeQvipDhlX$RoJGw2cAq3lB37Kjj1bqOZ5S+ukSq8F8nvfoPw++h7I=', NULL, 0, '22808862', 'Susanto', '22808862@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:51.539222', 'Samuel');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (269, 'pbkdf2_sha256$1000000$q7E3l3y1bnk61KuHbvZU3p$b3BnpjxQAWAKN3OrVKCcOv2pTpqr4Jvb9tLA6lelcEE=', NULL, 0, '21089145', 'Wijaya', '21089145@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:52.046172', 'Vincent');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (270, 'pbkdf2_sha256$1000000$oEKzl2bzu1mK31vp3jLaY0$1yk/VneylYw7quN5k/we8nLuamYwnvmiIrAFip3jxls=', NULL, 0, '21796571', 'Firas', '21796571@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:52.506054', 'Emir');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (271, 'pbkdf2_sha256$1000000$VxbDQ3DjNGMnDj6aBqVv2n$aTGwiQFIRdjdiq+sX65A0fjOtSaYqnMbMz3KAje6pn0=', NULL, 0, '22005841', 'Sugianto', '22005841@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:52.945964', 'Angelisa');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (272, 'pbkdf2_sha256$1000000$nifNQLhHGehk9RzqplOUlz$TYvIsoSL6wUWE3Qm6VK0/MYOScGiDTP5MuMmF6aNrR8=', NULL, 0, '21892987', 'Milagro', '21892987@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:53.374992', 'Abelle');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (273, 'pbkdf2_sha256$1000000$CXKRHGyZlu7YsBac2mhxYB$HMxm2SZm6JmAWGI4oDVpaX8ibgEfSEdgsF6ekWsznRY=', NULL, 0, '22295833', 'Chandra', '22295833@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:53.820220', 'Michael');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (274, 'pbkdf2_sha256$1000000$FQujROccPCDv1eV6PX5xEW$AhhDX62Q+s5d4RiEuFGPRCSyxUYygnpjY1prN0BJVpE=', NULL, 0, '21660883', 'Setiawan', '21660883@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:54.244836', 'Hanifa');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (275, 'pbkdf2_sha256$1000000$fbp4TJDxNqwjHnWDaewyCr$CW6v+LOYuxP6MZdJVafGQRJxQqugkIh+0iybixA+sz0=', NULL, 0, '21688623', 'Sutradjaja', '21688623@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:54.682113', 'Darryl');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (276, 'pbkdf2_sha256$1000000$cCDTVgcChSkb5uASjGviRx$MwGXEyoOddpiVufm/ZdDJXhx30fSNoBiR2G3IDK4c3Q=', NULL, 0, '21500167', 'Ritchie', '21500167@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:55.207199', 'Samuel');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (277, 'pbkdf2_sha256$1000000$TdY73DnphNl2N6DXbbi8sY$MJRajEogIRdCAGIh/P9GzTM+2U+zywp4KJn4kULDFwo=', NULL, 0, '20516244', 'Anjani', '20516244@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:55.682152', 'Nadja');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (278, 'pbkdf2_sha256$1000000$QnlMI8vWcVe9hxTMeddESd$X3uINsarkWhqniD1Di0Yw3opo3pk33jg5fiNeiaWKEI=', NULL, 0, '22845296', 'Jayani', '22845296@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:56.179943', 'Marella');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (279, 'pbkdf2_sha256$1000000$eVVkEvt56iUbtpvOUqOwF9$wIY9UjcQXN1Ptpj0hDBFYeTGp31ywSRmPuySHALpzW8=', NULL, 0, '23237111', 'Saktivel', '23237111@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:56.648026', 'Sanggar');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (280, 'pbkdf2_sha256$1000000$OpxpBfxA6fKPXExQAJ6tUt$/8cF2l5dhh6x+RJD1Rtm3feC4qFazFRsc53ganoqHek=', NULL, 0, '21023321', 'Budiono', '21023321@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:57.143100', 'Kenneth');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (281, 'pbkdf2_sha256$1000000$m2DfCY8saxN1oRoYzjwGwX$ioI7gvVbGVrpOXh5gNjQPaaZ+V8HgTWIbXEYx9DGQmc=', NULL, 0, '21024117', 'Adimulyo', '21024117@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:57.617902', 'Maria');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (282, 'pbkdf2_sha256$1000000$UpNA83YYg0ZOESZ9m1kNwg$3+6UtqW5mGmsOLnNCi+dTdFfana18qBTeVTEIq8vx/A=', NULL, 0, '22855350', 'Wicaksono', '22855350@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:58.067993', 'Stefanus');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (283, 'pbkdf2_sha256$1000000$W0WtfGC6BJc5kUFW0PtLU6$W/Ds06/+gVcD1MYXWQykIxdz2Fqq1sH6vMSXeN6aRBA=', NULL, 0, '21538032', 'Sondakh', '21538032@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:58.525467', 'Bryan');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (284, 'pbkdf2_sha256$1000000$okx9gkzxqROxtqfxDzYWp3$We/anZVpoJc+Cs2cOMVZ4eyVa6lRD1Y6wzIA0IlqN/0=', NULL, 0, '21464933', 'Krishna', '21464933@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:58.969166', 'Desak');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (285, 'pbkdf2_sha256$1000000$qUCvVLkxJF51kJ5jZ2LHi5$lQyNCBo61FuCrTkCs3ZK9iOt/7D43ntqLd/px3FzRts=', NULL, 0, '21442052', 'Zhara', '21442052@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:59.455854', 'Landrieta');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (286, 'pbkdf2_sha256$1000000$x70IIW6gi0d0GNGCOmMqYg$vLPpoN2PavktO1FVlNM81cI0x45QFU8FWuMWB9Shx3Q=', NULL, 0, '20709303', 'Santoso', '20709303@student.curtin.edu.au', 0, 1, '2025-05-13 07:09:59.910008', 'Jovan');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (287, 'pbkdf2_sha256$1000000$gLWK0k8YmTqlk8l0Sker84$+9tdE/oDUT6rf65UTLPIHjEedf4dRk6kEP6GZHPddS8=', NULL, 0, '21856491', 'Valerie', '21856491@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:00.346897', 'Stephanie');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (288, 'pbkdf2_sha256$1000000$70ApWIUVdVPHD4zmJHup91$6ZaNXkMyOFeSRXr3hIwTDGJmz7+qw63V/ynTp/kb8dk=', NULL, 0, '22438968', 'Grewal', '22438968@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:00.802813', 'Jaipal');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (289, 'pbkdf2_sha256$1000000$S3HlbBuVFAzO1hGm8EAEKD$FjeGRZpqT456zrDlt+zsjeu0SKuuxfV+cLJm4qjrxfs=', NULL, 0, '22041586', 'Djuhadi', '22041586@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:01.364210', 'Isabella');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (290, 'pbkdf2_sha256$1000000$G4cyWcA1SJfRRKBzrSJq4Z$0Bl7oBYMtvPnmdBBqq5MeArK+xyB1TAf11nnB9DdS7I=', NULL, 0, '22570077', 'Tan', '22570077@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:01.807493', 'Jessyca');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (291, 'pbkdf2_sha256$1000000$UF7NwrE8BAk5QaoE9ld77Z$/OhSHSiCmw2xozBRXUeXBBS5bioSJ1ollM3OzW0MDl4=', NULL, 0, '21663206', 'Alicia', '21663206@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:02.411914', 'Gwen');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (292, 'pbkdf2_sha256$1000000$P39PnWdQREAdkmhqv4xxij$Hw0hEHwm2n2utuHEOF6vc6rGRURiVgasuUyo/BhFUvw=', NULL, 0, '20525444', 'Yeo', '20525444@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:02.863761', 'Hek');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (293, 'pbkdf2_sha256$1000000$Cf4Ogi5xGtyeiel92MXo3u$LebU130rQl9cPk2e3DkEq335UJvyAsT5WSBXFGYQSyI=', NULL, 0, '22172703', 'An', '22172703@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:03.314204', 'Xinyu');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (294, 'pbkdf2_sha256$1000000$TcDC6zT2iNLmN3m6re4HmJ$j7cUITD4oerlzPlMFGXyDc8YEkLfFw56BDMEk8CIQR8=', NULL, 0, '21416578', 'Natalie', '21416578@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:03.749381', 'Candice');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (295, 'pbkdf2_sha256$1000000$bZ3kF31Ks7KLrGXDMEi55r$KTa0f2aXmt3x82FKD80tLtbaRD6bNJ4GSc5LYuDh7gs=', NULL, 0, '21636583', 'Ilangovan', '21636583@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:04.192211', 'Vignesh');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (296, 'pbkdf2_sha256$1000000$7ofrRU62ojh5pYpGIAcpNP$fKs1uiUBN7olRw1491s6VJkyF6EBZja81zVIt6LX7DU=', NULL, 0, '21795536', 'Feng', '21795536@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:04.634319', 'Bairui');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (297, 'pbkdf2_sha256$1000000$BYV6oYQnlLVHTWoj6x1X7P$xWtLU0PfaGIEDo0UCGzMtsGbvjS74pw5m1ABExfz9io=', NULL, 0, '21368190', 'Ang', '21368190@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:05.069347', 'Karen');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (298, 'pbkdf2_sha256$1000000$YWOsHhceMNbcfmEMVRf8Fk$qi1nOvH4jiaSBrgcw/yq+l3nIRC9rg7ICyCpMxSPUnI=', NULL, 0, '22811941', 'Lu', '22811941@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:05.633179', 'Xia');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (299, 'pbkdf2_sha256$1000000$IqeNEKRXh52ui8fdcbldLR$Rxc3xUtaHHywuY01ggRDkUgezOvMpIJ9IK9nQWC2Yfs=', NULL, 0, '23162734', 'Yixiao', '23162734@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:06.214050', 'Lang');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (300, 'pbkdf2_sha256$1000000$zPt1Ai4Hr6ImI2iWo6uqgh$FYuYgwO8aKPx3YgWE8uf40ugpVr3POLuzUc0p+6OtO0=', NULL, 0, '23081321', 'Mengyu', '23081321@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:07.197566', 'Yang');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (301, 'pbkdf2_sha256$1000000$HL6k4lri6UW5QoQ35ioOGY$7KxtbWLAlNgRwrg/TVKIV8trDypakPQveWdXBZvKoEk=', NULL, 0, '21998856', 'Jiang', '21998856@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:08.176580', 'Shixuan');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (302, 'pbkdf2_sha256$1000000$z4jGOcdh7WrzdMArDPBcle$C8rzZ8C9GX/dSRS4AKWYHFv3WtzY+iN79KE4fesnvu8=', NULL, 0, '21728930', 'Liu', '21728930@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:09.013043', 'Boxu');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (303, 'pbkdf2_sha256$1000000$kgfVlWt5AzZGrnFAesEQiQ$81wITEwQhkiYRzyvxO6j4otJX7TZozYHSoh9JMCcA14=', NULL, 0, '21921865', 'Luo', '21921865@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:09.750850', 'Tianyi');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (304, 'pbkdf2_sha256$1000000$LkBhm0gsdG4GVyXC8q95k1$+j1YS4x896lAzrSkd1Di4dMd6KKFDdxneH5xWC05Xuo=', NULL, 0, '21240780', 'An', '21240780@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:10.723076', 'Hongyi');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (305, 'pbkdf2_sha256$1000000$On7ApfTPkGBx2k9wQFXMiZ$oC6MGnjj04DZUL5HRgMTXzpEYDwV1BkSvH8VLeFR2wI=', NULL, 0, '21429136', 'Xiong', '21429136@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:11.383580', 'Junshen');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (306, 'pbkdf2_sha256$1000000$sl7VMtPDLQhJDkbxOGN0Ps$ShAtJ2pC/eVeBXTh0ogLuAzc5GZYZIfhZ8lQ0N5HvtU=', NULL, 0, '21615854', 'Yang', '21615854@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:12.104665', 'Kai');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (307, 'pbkdf2_sha256$1000000$uYClHPgaU32m8dXiyGG5r7$zcxFnSADAMQm3XCTo3SLK8c5AgVv09oKQvgBNpNcfcg=', NULL, 0, '21577378', 'Wu', '21577378@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:13.007541', 'Xiaofeng');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (308, 'pbkdf2_sha256$1000000$6s1CMQkfNdtqbTO11B3Gx4$y6osVBCL1JgUvTtohj+2iDQJNEcgxhCwFgtJaoa616c=', NULL, 0, '20654827', 'Izham', '20654827@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:13.739464', 'Ilya');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (309, 'pbkdf2_sha256$1000000$gSFS4GdJs5GKhGcnPdy6GU$2DvRhDIFjBjrAIexv/1QF/NZWjMT+dDVzWsEOKQRsT8=', NULL, 0, '21774085', 'Salwa', '21774085@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:14.404239', 'Nurcahaya');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (310, 'pbkdf2_sha256$1000000$5qqPaYYBSzpFSZQy1p1xFB$bLb8wAXxSebHR/B4L9RXCgnahSZcrfrumd84qfTR8h4=', NULL, 0, '21356412', 'Lim', '21356412@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:15.049823', 'Andre');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (311, 'pbkdf2_sha256$1000000$d6Q2ZG8q7qGUVaYRTntpGI$TBYFyi/e4P4aJZSIco9ro8bGfgcjefP1KMvYEAm0f+k=', NULL, 0, '21672723', 'Tse', '21672723@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:15.648838', 'Man');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (312, 'pbkdf2_sha256$1000000$r3McCuWR7bF3SHi3LbLtgu$d9r8jUTv6bEhW/NOkh5GcfvtRTbNr5s1PaRKHgsDkG0=', NULL, 0, '21622582', 'Johan', '21622582@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:16.309131', 'Kevin');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (313, 'pbkdf2_sha256$1000000$yPm0bkkkBKnJtn7ydRYXOp$rQDO8eAIlJaIbCNPN7v8EWUe6vTSMLimZfR2ph2hFTs=', NULL, 0, '21856705', 'Paing', '21856705@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:17.279303', 'Myo');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (314, 'pbkdf2_sha256$1000000$SdXfsfZloNgPK1FdVPU85g$aEBeMEgaOPPZROM+1t+xSdulxdqzyEMnw3X5de8IFvs=', NULL, 0, '21590919', 'Wiguno', '21590919@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:18.194714', 'Nathan');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (315, 'pbkdf2_sha256$1000000$zO9I2eerRBDbvIUF6xYKB0$AK4SHc4q443V8z07X/rNyKk0kkLNilDKbCjX2s2UVOw=', NULL, 0, '22417970', 'Tidy', '22417970@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:18.827308', 'Daniella');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (316, 'pbkdf2_sha256$1000000$tMTWecanFtmiADOWE5dXiB$5SpeS/3NXg5fQG50G2RzlVzWIYxn9ntRXZ/2QTQ2YSI=', NULL, 0, '21462209', 'Sutandar', '21462209@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:19.473197', 'Jason');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (317, 'pbkdf2_sha256$1000000$5Tk4wavYBV5xXthCxywJpu$qBp1ZL4uQRA4XgHT5u6KqSVIsvsPL3QkuSfSJCH9x/Y=', NULL, 0, '22910411', 'Ermis', '22910411@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:20.220930', 'Eda');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (318, 'pbkdf2_sha256$1000000$iLUBtil9EUQ7DFLoKZzOxE$MBK0sZ/kjSOjnKhOhI1qccB64CpPaZqR49TxHY6Q/k8=', NULL, 0, '22662482', 'Lim', '22662482@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:20.850233', 'Kaylene');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (319, 'pbkdf2_sha256$1000000$mjIB1DpuTIknChNCm499wl$awZ5hXoHzQnjHbS1e6ilr7c0K3QAwNPak7C+y409sbw=', NULL, 0, '21660935', 'Fang', '21660935@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:21.549424', 'Kazya');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (320, 'pbkdf2_sha256$1000000$3M40SSynSYLrwjdUZGQNbq$E8PwJFUadlzl7qu5IYiW+tZWkfgfpvtKsDlpt7uP7Ec=', NULL, 0, '22284899', 'Pasing', '22284899@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:22.236812', 'Evelyn');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (321, 'pbkdf2_sha256$1000000$iF7nOVVGhY5vVppnH99XkH$hyL3wE9Rp1IvKysSOSKsO4tGNm2c/dzWVo+nt9jbFRg=', NULL, 0, '21645178', 'Gunawan', '21645178@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:22.942956', 'Clarryta');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (322, 'pbkdf2_sha256$1000000$yjebo5g09qkTmMZYNeVe6j$jtWbhkghEoVMiDoLz+t/7wI9RiJu9i3KtiRG88DPxl4=', NULL, 0, '22704284', 'Al-Rashid', '22704284@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:23.625096', 'Marwah');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (323, 'pbkdf2_sha256$1000000$ZNJBAsIJWjtsDVwHmmKwm3$wyYxuVYjSuT8nS3UfSjf5CskF7npdIxtnfNs6Y8SHY8=', NULL, 0, '22080835', 'Malone', '22080835@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:24.413543', 'Steven');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (324, 'pbkdf2_sha256$1000000$Gzl4JvchJNWmFIUlsBM194$4fjQhPalspWs1+iq91GZXs6HaagcUPLsW18l5dZvXkM=', NULL, 0, '22273402', 'Ting', '22273402@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:25.198564', 'Teck');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (325, 'pbkdf2_sha256$1000000$b4R2wGfuo8sLNIj9omRraK$z2vhc8LuyC47VSfoXCwiOS6f1txR0FMvsHXYgViqxWM=', NULL, 0, '21391536', 'Ting', '21391536@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:25.862578', 'Teck');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (326, 'pbkdf2_sha256$1000000$MHk8qEsdXBzCkXrijxCQGO$IT16NwBfPzKMNzMYV7ZbXULURVaDzcV5J+zBcIs2Tgg=', NULL, 0, '23016006', 'Muthuraman', '23016006@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:26.511930', 'Mukesh');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (327, 'pbkdf2_sha256$1000000$4sfePauDkDtc9jl0LVYu4H$4mz0H7e7V+QjHpkTzTFI3Y+ImhnpH9Qi2ca3+2NXnIs=', NULL, 0, '22034175', 'To', '22034175@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:27.133279', 'Binh');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (328, 'pbkdf2_sha256$1000000$4P2Nhlopx3Wd8Kb6oU62Qk$4V5+2ceQg0hPJJd3bG3lidmNagvDGA7PeOFF9jnLhlY=', NULL, 0, '21100001', 'Clara', '21100001@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:27.799904', 'Alexander');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (329, 'pbkdf2_sha256$1000000$EXicpsboV5elJ3LgOcq3sG$Hpy+TYJCy7fTmQbQiHJ6ms8+kHiImjmstYpkiiXJXt4=', NULL, 0, '21100002', 'Hudson', '21100002@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:28.557821', 'Phoelo');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (330, 'pbkdf2_sha256$1000000$hCAcv6BPmQWn2tn9cKzCQu$hRJ2rOaLDyUyekU4s6/Uau3ET5+++3XoEM+JwfZOMFk=', NULL, 0, '21100003', 'Universe', '21100003@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:29.235361', 'Steven');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (331, 'pbkdf2_sha256$1000000$k6i8i45oWe6JzvReDeIEZL$7rpFlZuc5RhoBdogOKzPzdn6RAVLZJBsaCp9PgZNGWQ=', NULL, 0, '21100004', 'Tran', '21100004@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:30.025924', 'Jenny');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (332, 'pbkdf2_sha256$1000000$dShir2ge05q7E4vtLzLovX$EDkSDS/++6A+MkgtjROI9jvspQigbuRjvmEXEs3o8lM=', NULL, 0, '21100005', 'Layton', '21100005@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:30.739970', 'Hershel');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (333, 'pbkdf2_sha256$1000000$1YEiIQVx6BOSxgexWoPdNe$SnEtAs00bhwK9rE9WovkrHsv90u+ZM8wWfXilnAsvs4=', NULL, 0, '21100006', 'Maximum', '21100006@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:31.525091', 'Barbaros');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (334, 'pbkdf2_sha256$1000000$beh8WjMX0X1LNYKuiBBPl2$ql/MduIZy+0TB1PbBNrdHFJTOx/Gj1UTLvrvH23eylw=', NULL, 0, '21100007', 'Heart', '21100007@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:32.316792', 'Sora');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (335, 'pbkdf2_sha256$1000000$cKyOr3irYCSpvhl833OZFR$xO7zU725F9yD3xrkjNEXXixtaWlQFAwkPKOM6VxGGfI=', NULL, 0, '21100008', 'Fey', '21100008@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:33.050811', 'Maya');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (336, 'pbkdf2_sha256$1000000$v5t22OhURcX4ugHc1me9Ba$TzNhmAKpI2g7iovpV2WJZkQlJMtHEEg889JGUvdmBn0=', NULL, 0, '21100009', 'Pham', '21100009@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:33.523335', 'Steve');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (337, 'pbkdf2_sha256$1000000$8K2P8ayOgk8dnldPJODH7H$vaO+gj+JRoYCuAWKvKh5N7nNHsO1fZZms3nO3egzwNM=', NULL, 0, '21100010', 'Choy', '21100010@student.curtin.edu.au', 0, 1, '2025-05-13 07:10:33.987140', 'Murphy');

-- Table structure for table `django_session`
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE django_session (
  `session_key` VARCHAR(40) NOT NULL PRIMARY KEY,
  `session_data` TEXT,
  `expire_date` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `django_session`
INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES ('yu4xo1husr3u2glh0lcwir11df9ic90r', '.eJxVjDsOwjAUBO_iGlnPduIPJT1nsNb2Cw4gR8qnQtwdIqWAdmdmXyJiW2vcFp7jWMRZGHH63RLyg9sOyh3tNsk8tXUek9wVedBFXqfCz8vh_h1ULPVbk9XU2dC74JXvkRm5IBXtzABHAJMnKBe002SVD1p13jJTb2AxmCzeH8fyNzY:1u67wM:nthL75tu3lqKthcM3m3BU4CgOVOWxxfYXmiWRbSypEU', '2025-05-03 13:09:02.402588');
INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES ('6kwobxm3mve9znhymezsgv55s3eptt5b', '.eJxVjDsOwjAUBO_iGln-xA6mpM8ZrH1-NgkgR4qTCnF3iJQC2p2ZfYmIbR3j1vISJxYXYbw4_Y6E9Mh1J3xHvc0yzXVdJpK7Ig_a5DBzfl4P9-9gRBu_tU5ItrOAhSk-9AAVsD_DsaOcNfmuC4mKCcn0UNy7oFgrT4FcKNaK9wc6vTjq:1u8Xu1:Zuq8qEoROv_JCji8B-Je4DH3NB8K4bIR5m1F84mRGrA', '2025-05-10 05:16:37.196894');
INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES ('8lhvyxygggbk28598d57tax5t2z90quc', 'e30:1uEKcu:VSVCu7J6l0kkoWdTZ7zttydfyZ07zrXE7BX4SR0jb9Y', '2025-05-26 04:18:52.863925');
INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES ('qkdk4xx8v8knewkshbdezm16fe8lquqk', 'e30:1uEKeP:bkQHZ7Ev3w-1sZgi9chKkwngf2pIkTldFIusWQLRQPw', '2025-05-26 04:20:25.132920');
INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES ('w2wsifq8848tjkdxpm7o4xms13hyjm13', '.eJxVjDsOwjAUBO_iGln-xA6mpM8ZrH1-NgkgR4qTCnF3iJQC2p2ZfYmIbR3j1vISJxYXYbw4_Y6E9Mh1J3xHvc0yzXVdJpK7Ig_a5DBzfl4P9-9gRBu_tU5ItrOAhSk-9AAVsD_DsaOcNfmuC4mKCcn0UNy7oFgrT4FcKNaK9wc6vTjq:1uEKul:nB3rC68lNkjLYIAJ2XrU4EuPAUMYZIHJ1KOOX9eY0iw', '2025-05-26 04:37:19.328740');

-- Table structure for table `event_page_clubeventpage`
DROP TABLE IF EXISTS `event_page_clubeventpage`;
CREATE TABLE event_page_clubeventpage (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `event_id` INT NOT NULL UNIQUE,
  FOREIGN KEY (`event_id`) REFERENCES `add_event_event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `event_registration_eventregistration`
DROP TABLE IF EXISTS `event_registration_eventregistration`;
CREATE TABLE event_registration_eventregistration (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `role` VARCHAR(50) NOT NULL,
  `registered_at` DATETIME NOT NULL,
  `event_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  FOREIGN KEY (`event_id`) REFERENCES `add_event_event` (`id`),
  FOREIGN KEY (`student_id`) REFERENCES `user_profile_student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `add_event_event`
DROP TABLE IF EXISTS `add_event_event`;
CREATE TABLE add_event_event (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `club_id` INT NOT NULL,
  `created_by_id` INT NOT NULL,
  `banner` VARCHAR(100) NULL,
  FOREIGN KEY (`club_id`) REFERENCES `clubs_club` (`id`),
  FOREIGN KEY (`created_by_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `clubs_clubmembership`
DROP TABLE IF EXISTS `clubs_clubmembership`;
CREATE TABLE clubs_clubmembership (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `position` VARCHAR(50) NOT NULL,
  `custom_position` VARCHAR(100) NULL,
  `club_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  FOREIGN KEY (`club_id`) REFERENCES `clubs_club` (`id`),
  FOREIGN KEY (`student_id`) REFERENCES `user_profile_student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `clubs_club`
DROP TABLE IF EXISTS `clubs_club`;
CREATE TABLE clubs_club (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `president_id` INT NULL,
  `logo` VARCHAR(100) NULL,
  `banner` VARCHAR(100) NULL,
  FOREIGN KEY (`president_id`) REFERENCES `user_profile_student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `clubs_colorpalette`
DROP TABLE IF EXISTS `clubs_colorpalette`;
CREATE TABLE clubs_colorpalette (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `image_path` VARCHAR(255) NOT NULL UNIQUE,
  `dominant_color` VARCHAR(50) NULL,
  `secondary_color` VARCHAR(50) NULL,
  `tertiary_color` VARCHAR(50) NULL,
  `shadow_color` VARCHAR(50) NULL,
  `last_calculated` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `clubs_colorpalette`
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (1, 'D:\UnihubCapstone\frontend\src\assets\club_banners\board-banner.png', '[250, 238, 218]', '[125, 78, 68]', '[231, 179, 25]', '[96, 76, 43]', '2025-05-12 04:21:38.601683');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (2, 'D:\UnihubCapstone\frontend\src\assets\club_banners\ccsc-banner.png', '[48, 61, 73]', '[249, 236, 238]', '[226, 92, 76]', '[16, 18, 20]', '2025-05-12 04:21:41.398190');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (3, 'D:\UnihubCapstone\frontend\src\assets\event_banners\board-event-banner_5niUVoZ.png', '[242, 226, 215]', '[28, 28, 28]', '[243, 148, 26]', '[86, 65, 51]', '2025-05-12 04:21:46.563254');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (4, 'D:\UnihubCapstone\frontend\src\assets\event_banners\ccsc-event-banner_HyovL1w.png', '[251, 244, 236]', '[150, 71, 60]', '[243, 180, 96]', '[96, 74, 49]', '2025-05-12 04:21:48.322436');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (5, 'D:\UnihubCapstone\frontend\src\assets\club_banners\art-event-banner_PdumQft.png', '[234, 234, 232]', '[58, 106, 161]', '[178, 139, 99]', '[71, 71, 68]', '2025-05-12 14:47:20.511637');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (6, 'D:\UnihubCapstone\frontend\src\assets\event_banners\art-event-banner_IuaEC4j.png', '[234, 234, 232]', '[58, 106, 161]', '[178, 139, 99]', '[71, 71, 68]', '2025-05-12 14:55:10.502305');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (7, 'D:\UnihubCapstone\frontend\src\assets\event_banners\art-event-banner_oAHfTTx.png', '[234, 234, 232]', '[58, 106, 161]', '[178, 139, 99]', '[71, 71, 68]', '2025-05-12 14:55:13.443545');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (8, 'D:\UnihubCapstone\frontend\src\assets\event_banners\board-event-banner_5k5KqRo.png', '[242, 226, 215]', '[28, 28, 28]', '[243, 148, 26]', '[86, 65, 51]', '2025-05-12 15:02:50.780509');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (9, 'D:\UnihubCapstone\frontend\src\assets\event_banners\board-event-banner_57oTeOT.png', '[242, 226, 215]', '[28, 28, 28]', '[243, 148, 26]', '[86, 65, 51]', '2025-05-12 15:02:55.055139');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (10, 'D:\UnihubCapstone\frontend\src\assets\event_banners\ccsc-event-banner_DrU9ozR.png', '[251, 244, 236]', '[150, 71, 60]', '[243, 180, 96]', '[96, 74, 49]', '2025-05-12 15:04:16.174035');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (11, 'D:\UnihubCapstone\frontend\src\assets\event_banners\ccsc-event-banner_vH4IDYl.png', '[251, 244, 236]', '[150, 71, 60]', '[243, 180, 96]', '[96, 74, 49]', '2025-05-12 15:15:20.112419');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (12, 'D:\UnihubCapstone\frontend\src\assets\club_banners\art-event-banner_Bt7FS5r.png', '[234, 234, 232]', '[58, 106, 161]', '[178, 139, 99]', '[71, 71, 68]', '2025-05-13 01:45:50.710377');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (13, 'D:\UnihubCapstone\frontend\src\assets\event_banners\art-banner_F1Edzz6.png', '[113, 100, 90]', '[220, 195, 178]', '[176, 182, 185]', '[32, 30, 28]', '2025-05-13 01:47:07.429299');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (14, 'D:\UnihubCapstone\frontend\src\assets\event_banners\art-event-banner_FkS9oXd.png', '[234, 234, 232]', '[58, 106, 161]', '[178, 139, 99]', '[71, 71, 68]', '2025-05-13 01:49:08.180093');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (15, 'D:\UnihubCapstone\frontend\src\assets\club_banners\art-event-banner_KPjEIw2.png', '[234, 234, 232]', '[58, 106, 161]', '[178, 139, 99]', '[71, 71, 68]', '2025-05-13 01:58:20.572527');
INSERT INTO `clubs_colorpalette` (`id`, `image_path`, `dominant_color`, `secondary_color`, `tertiary_color`, `shadow_color`, `last_calculated`) VALUES (16, 'D:\UnihubCapstone\frontend\src\assets\club_banners\art-banner_3zu5fT4.png', '[113, 100, 90]', '[220, 195, 178]', '[176, 182, 185]', '[32, 30, 28]', '2025-05-13 02:00:06.955559');

-- Table structure for table `feedback_feedback`
DROP TABLE IF EXISTS `feedback_feedback`;
CREATE TABLE feedback_feedback (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `satisfaction` VARCHAR(50) NOT NULL,
  `dislike` TEXT,
  `experience` TEXT,
  `like` TEXT,
  `role` VARCHAR(50) NOT NULL,
  `event_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  FOREIGN KEY (`event_id`) REFERENCES `add_event_event` (`id`),
  FOREIGN KEY (`student_id`) REFERENCES `user_profile_student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `user_profile_student`
DROP TABLE IF EXISTS `user_profile_student`;
CREATE TABLE user_profile_student (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(254) NOT NULL UNIQUE,
  `studentid` VARCHAR(20) NOT NULL UNIQUE,
  `profile_picture` VARCHAR(100) NULL,
  `user_id` INT NOT NULL UNIQUE REFERENCES `auth_user` (`id`) ,
  `first_name` VARCHAR(50) NULL,
  `last_name` VARCHAR(50) NULL,
  `middle_name` VARCHAR(100) NULL,
  `badges` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `user_profile_student`
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (20516244, 'Nadja Anjani', '20516244@student.curtin.edu.au', '20516244', NULL, 277, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (20525444, 'Hek Kit Yeo', '20525444@student.curtin.edu.au', '20525444', NULL, 292, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (20654827, 'Ilya Yasmin Binte Nor Izham', '20654827@student.curtin.edu.au', '20654827', NULL, 308, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (20673437, 'Navena S Suresh', '20673437@student.curtin.edu.au', '20673437', NULL, 254, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (20709303, 'Jovan Santoso', '20709303@student.curtin.edu.au', '20709303', NULL, 286, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (20850609, 'Steven Widjaja', '20850609@student.curtin.edu.au', '20850609', NULL, 248, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21023321, 'Kenneth Ashton Budiono', '21023321@student.curtin.edu.au', '21023321', NULL, 280, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21024117, 'Maria Jessica Felicia Adimulyo', '21024117@student.curtin.edu.au', '21024117', NULL, 281, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21073614, 'Zaifa Niyaz', '21073614@student.curtin.edu.au', '21073614', NULL, 255, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21089145, 'Vincent Wijaya', '21089145@student.curtin.edu.au', '21089145', NULL, 269, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21100001, 'Alexander Clara', '21100001@student.curtin.edu.au', '21100001', NULL, 328, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21100002, 'Phoelo Hudson', '21100002@student.curtin.edu.au', '21100002', NULL, 329, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21100003, 'Steven DeMayo Universe', '21100003@student.curtin.edu.au', '21100003', NULL, 330, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21100004, 'Jenny Tran', '21100004@student.curtin.edu.au', '21100004', NULL, 331, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21100005, 'Hershel Layton', '21100005@student.curtin.edu.au', '21100005', NULL, 332, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21100006, 'Barbaros Gluteous Maximum', '21100006@student.curtin.edu.au', '21100006', NULL, 333, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21100007, 'Sora Braviado Heart', '21100007@student.curtin.edu.au', '21100007', NULL, 334, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21100008, 'Maya Fey', '21100008@student.curtin.edu.au', '21100008', NULL, 335, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21100009, 'Steve Pham', '21100009@student.curtin.edu.au', '21100009', NULL, 336, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21100010, 'Murphy Choy', '21100010@student.curtin.edu.au', '21100010', NULL, 337, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21240780, 'Hongyi An', '21240780@student.curtin.edu.au', '21240780', NULL, 304, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21329676, 'Ayrelyn Vaustine Jhonatan', '21329676@student.curtin.edu.au', '21329676', NULL, 265, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21356412, 'Andre Lim', '21356412@student.curtin.edu.au', '21356412', NULL, 310, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21361322, 'Michelle Koh Hui Ching', '21361322@student.curtin.edu.au', '21361322', NULL, 250, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21368190, 'Karen Ang', '21368190@student.curtin.edu.au', '21368190', NULL, 297, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21391536, 'Teck Rong Ting', '21391536@student.curtin.edu.au', '21391536', NULL, 325, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21416578, 'Candice Natalie', '21416578@student.curtin.edu.au', '21416578', NULL, 294, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21429136, 'Junshen Xiong', '21429136@student.curtin.edu.au', '21429136', NULL, 305, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21442052, 'Landrieta Aisya Zhara', '21442052@student.curtin.edu.au', '21442052', NULL, 285, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21449723, 'Hans Hartowidjojo', '21449723@student.curtin.edu.au', '21449723', NULL, 243, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21462209, 'Jason Sutandar', '21462209@student.curtin.edu.au', '21462209', NULL, 316, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21464933, 'Desak Made Kirana Krishna', '21464933@student.curtin.edu.au', '21464933', NULL, 284, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21500167, 'Samuel Ritchie', '21500167@student.curtin.edu.au', '21500167', NULL, 276, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21538032, 'Bryan Kennet Jalesvira Sondakh', '21538032@student.curtin.edu.au', '21538032', NULL, 283, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21577378, 'Xiaofeng Wu', '21577378@student.curtin.edu.au', '21577378', NULL, 307, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21590919, 'Nathan Sebastian Wiguno', '21590919@student.curtin.edu.au', '21590919', NULL, 314, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21610778, 'Clarissa Adeliawanti', '21610778@student.curtin.edu.au', '21610778', NULL, 246, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21615854, 'Kai Yang', '21615854@student.curtin.edu.au', '21615854', NULL, 306, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21622582, 'Kevin Johan', '21622582@student.curtin.edu.au', '21622582', NULL, 312, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21629004, 'Muhamad Shahul Hameed bin Mohamed Thair', '21629004@student.curtin.edu.au', '21629004', NULL, 245, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21636583, 'Vignesh Ilangovan', '21636583@student.curtin.edu.au', '21636583', NULL, 295, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21645178, 'Clarryta Gunawan', '21645178@student.curtin.edu.au', '21645178', NULL, 321, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21650596, 'Jiale Chen', '21650596@student.curtin.edu.au', '21650596', NULL, 260, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21660883, 'Hanifa Wardhany Setiawan', '21660883@student.curtin.edu.au', '21660883', NULL, 274, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21660935, 'Kazya Callista Fang', '21660935@student.curtin.edu.au', '21660935', NULL, 319, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21663206, 'Gwen Alicia', '21663206@student.curtin.edu.au', '21663206', NULL, 291, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21672723, 'Man Tik Tse', '21672723@student.curtin.edu.au', '21672723', NULL, 311, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21688623, 'Darryl Sutradjaja', '21688623@student.curtin.edu.au', '21688623', NULL, 275, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21691744, 'Sarah Barry', '21691744@student.curtin.edu.au', '21691744', NULL, 258, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21708165, 'Nathan Teruna', '21708165@student.curtin.edu.au', '21708165', NULL, 249, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21714670, 'Kenzo Yeo', '21714670@student.curtin.edu.au', '21714670', NULL, 244, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21716304, 'Evangeline Tanoto', '21716304@student.curtin.edu.au', '21716304', NULL, 256, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21716325, ' ', '87654321@student.curtin.edu.au', '87654321', '', 26, '', '', NULL, '[]');
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21728930, 'Boxu Liu', '21728930@student.curtin.edu.au', '21728930', NULL, 302, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21739699, 'Viktoriia Kudelina', '21739699@student.curtin.edu.au', '21739699', NULL, 259, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21759244, 'Trisia Jasmine', '21759244@student.curtin.edu.au', '21759244', NULL, 263, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21774085, 'Nurcahaya Dzakkiyah Salwa', '21774085@student.curtin.edu.au', '21774085', NULL, 309, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21795536, 'Bairui Feng', '21795536@student.curtin.edu.au', '21795536', NULL, 296, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21796568, 'Pande P Yukarin Audrey Elvina', '21796568@student.curtin.edu.au', '21796568', NULL, 264, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21796571, 'Emir Ihsan Firas', '21796571@student.curtin.edu.au', '21796571', NULL, 270, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21832556, 'Gregorius Arvindra Prasetyo', '21832556@student.curtin.edu.au', '21832556', NULL, 251, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21851140, 'Clarissa Betaubun', '21851140@student.curtin.edu.au', '21851140', NULL, 266, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21856491, 'Stephanie Valerie', '21856491@student.curtin.edu.au', '21856491', NULL, 287, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21856705, 'Myo Set Paing', '21856705@student.curtin.edu.au', '21856705', NULL, 313, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21857274, 'Hou Hon U', '21857274@student.curtin.edu.au', '21857274', NULL, 262, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21871261, 'Yessica Nadya Danusaputro', '21871261@student.curtin.edu.au', '21871261', NULL, 247, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21892987, 'Abelle Milagro', '21892987@student.curtin.edu.au', '21892987', NULL, 272, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21904442, 'Gabrielle Eugenia', '21904442@student.curtin.edu.au', '21904442', NULL, 257, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21917372, 'Noah Emmanuel Tristan', '21917372@student.curtin.edu.au', '21917372', NULL, 252, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21921865, 'Tianyi Luo', '21921865@student.curtin.edu.au', '21921865', NULL, 303, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21960839, 'Virginia Frilly Analda Changir', '21960839@student.curtin.edu.au', '21960839', NULL, 261, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (21998856, 'Shixuan Jiang', '21998856@student.curtin.edu.au', '21998856', NULL, 301, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22005841, 'Angelisa Sugianto', '22005841@student.curtin.edu.au', '22005841', NULL, 271, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22034175, 'Binh Gia Minh To', '22034175@student.curtin.edu.au', '22034175', NULL, 327, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22041586, 'Isabella Karunia Djuhadi', '22041586@student.curtin.edu.au', '22041586', NULL, 289, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22080835, 'Steven Malone', '22080835@student.curtin.edu.au', '22080835', NULL, 323, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22172703, 'Xinyu An', '22172703@student.curtin.edu.au', '22172703', NULL, 293, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22273402, 'Teck Yao Ting', '22273402@student.curtin.edu.au', '22273402', NULL, 324, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22284899, 'Evelyn Tamod-Oc Pasing', '22284899@student.curtin.edu.au', '22284899', NULL, 320, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22295833, 'Michael Chandra', '22295833@student.curtin.edu.au', '22295833', NULL, 273, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22417970, 'Daniella Tidy', '22417970@student.curtin.edu.au', '22417970', NULL, 315, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22438968, 'Jaipal Singh Grewal', '22438968@student.curtin.edu.au', '22438968', NULL, 288, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22570077, 'Jessyca Jue Ying Tan', '22570077@student.curtin.edu.au', '22570077', NULL, 290, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22662482, 'Kaylene Lim', '22662482@student.curtin.edu.au', '22662482', NULL, 318, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22704284, 'Marwah Al-Rashid', '22704284@student.curtin.edu.au', '22704284', NULL, 322, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22712439, 'Stella Sutanto', '22712439@student.curtin.edu.au', '22712439', NULL, 253, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22743002, 'David Raymond Tjhie', '22743002@student.curtin.edu.au', '22743002', NULL, 267, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22808862, 'Samuel Susanto', '22808862@student.curtin.edu.au', '22808862', NULL, 268, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22811941, 'Xia Lu', '22811941@student.curtin.edu.au', '22811941', NULL, 298, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22845296, 'Marella Renata Jayani', '22845296@student.curtin.edu.au', '22845296', NULL, 278, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22855350, 'Stefanus Wicaksono', '22855350@student.curtin.edu.au', '22855350', NULL, 282, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (22910411, 'Eda Ebru Ermis', '22910411@student.curtin.edu.au', '22910411', NULL, 317, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (23016006, 'Mukesh Muthuraman', '23016006@student.curtin.edu.au', '23016006', NULL, 326, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (23081321, 'Yang Mengyu', '23081321@student.curtin.edu.au', '23081321', NULL, 300, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (23162734, 'Lang Yixiao', '23162734@student.curtin.edu.au', '23162734', NULL, 299, NULL, NULL, NULL, NULL);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `user_id`, `first_name`, `last_name`, `middle_name`, `badges`) VALUES (23237111, 'Sanggar Saktivel', '23237111@student.curtin.edu.au', '23237111', NULL, 279, NULL, NULL, NULL, NULL);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;

