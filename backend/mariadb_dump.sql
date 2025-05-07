-- MariaDB dump created by SQLite to MariaDB converter
-- Created at: 2025-05-06 16:11:45
-- Original SQLite database: backend/mydatabase

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

-- Table structure for table `django_migrations`
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE django_migrations (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "app" VARCHAR(255) NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "applied" DATETIME NOT NULL
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
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (56, 'clubs', '0004_remove_member_clubs_clubmembership_club_members', '2025-04-27 16:13:55.332952');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (57, 'clubs', '0005_delete_member', '2025-04-27 16:13:55.343989');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (58, 'add_event', '0003_alter_event_created_by', '2025-04-30 08:57:01.105104');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (59, 'clubs', '0006_alter_clubmembership_options', '2025-04-30 08:57:01.117958');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (60, 'feedback', '0004_feedback_student', '2025-05-02 02:57:28.192658');
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (61, 'feedback', '0005_alter_feedback_student', '2025-05-02 02:59:22.569709');

-- Table structure for table `auth_group_permissions`
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE auth_group_permissions (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "group_id" INT NOT NULL REFERENCES "AUTH_GROUP" ("ID") DEFERRABLE INITIALLY DEFERRED,
  "permission_id" INT NOT NULL REFERENCES "AUTH_PERMISSION" ("ID") DEFERRABLE INITIALLY DEFERRED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `auth_user_groups`
DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE auth_user_groups (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "user_id" INT NOT NULL REFERENCES "AUTH_USER" ("ID") DEFERRABLE INITIALLY DEFERRED,
  "group_id" INT NOT NULL REFERENCES "AUTH_GROUP" ("ID") DEFERRABLE INITIALLY DEFERRED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `auth_user_user_permissions`
DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE auth_user_user_permissions (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "user_id" INT NOT NULL REFERENCES "AUTH_USER" ("ID") DEFERRABLE INITIALLY DEFERRED,
  "permission_id" INT NOT NULL REFERENCES "AUTH_PERMISSION" ("ID") DEFERRABLE INITIALLY DEFERRED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `django_admin_log`
DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE django_admin_log (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "object_id" TEXT,
  "object_repr" VARCHAR(200) NOT NULL,
  "action_flag" SMALLINT UNSIGNED NOT NULL CHECK ("ACTION_FLAG" >= 0),
  "change_message" TEXT,
  "content_type_id" INT NULL REFERENCES "DJANGO_CONTENT_TYPE" ("ID") DEFERRABLE INITIALLY DEFERRED,
  "user_id" INT NOT NULL REFERENCES "AUTH_USER" ("ID") DEFERRABLE INITIALLY DEFERRED,
  "action_time" DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `django_admin_log`
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (1, '2', 'Curtin Singapore Community Service Club', 2, '[{"changed": {"fields": ["Club Banner"]}}]', 9, 3, '2025-04-20 01:29:33.106208');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (2, '1', 'Board Game Club', 2, '[{"changed": {"fields": ["Club Banner"]}}]', 9, 3, '2025-04-20 01:29:56.684414');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (3, '1', 'Board Game Club', 2, '[{"changed": {"fields": ["Club Banner"]}}]', 9, 3, '2025-04-20 01:41:08.420973');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (4, '6', 'dummy1', 3, '', 4, 3, '2025-04-20 08:00:32.105371');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (5, '15', 'dummy10', 3, '', 4, 3, '2025-04-20 08:00:38.419054');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (6, '14', 'dummy9', 3, '', 4, 3, '2025-04-20 08:00:46.866868');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (7, '13', 'dummy8', 3, '', 4, 3, '2025-04-20 08:00:52.732445');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (8, '12', 'dummy7', 3, '', 4, 3, '2025-04-20 08:00:58.197489');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (9, '11', 'dummy6', 3, '', 4, 3, '2025-04-20 08:01:03.130017');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (10, '10', 'dummy5', 3, '', 4, 3, '2025-04-20 08:01:07.765441');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (11, '9', 'dummy4', 3, '', 4, 3, '2025-04-20 08:01:12.832952');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (12, '8', 'dummy3', 3, '', 4, 3, '2025-04-20 08:01:17.680268');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (13, '7', 'dummy2', 3, '', 4, 3, '2025-04-20 08:01:22.413648');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (14, '1', 'Board Game Club', 2, '[{"changed": {"fields": ["Club Logo"]}}]', 9, 3, '2025-04-20 09:10:52.357369');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (15, '2', 'Curtin Singapore Community Service Club', 2, '[]', 9, 3, '2025-04-20 09:28:29.254387');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (16, '2', 'Curtin Singapore Community Service Club', 2, '[{"changed": {"fields": ["Club Logo"]}}]', 9, 3, '2025-04-20 10:56:16.089785');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (17, '2', 'Community Service Day', 2, '[{"changed": {"fields": ["Banner"]}}]', 11, 3, '2025-04-21 07:55:55.135767');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (18, '1', 'Board Games Night', 2, '[{"changed": {"fields": ["Banner"]}}]', 11, 3, '2025-04-21 07:56:03.968151');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (19, '3', 'Art Club', 3, '', 9, 26, '2025-04-27 07:53:54.732346');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (20, '3', 'Hans Hartowidjojo (President)', 2, '[{"changed": {"fields": ["Clubs", "Position"]}}]', 10, 26, '2025-04-27 10:05:46.382281');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (21, '3', 'Hans Hartowidjojo (President)', 2, '[{"changed": {"fields": ["Clubs", "Position"]}}]', 10, 26, '2025-04-27 10:19:49.842557');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (22, '1', 'Board Games Night', 2, '[{"changed": {"fields": ["Banner"]}}]', 11, 26, '2025-04-27 16:24:26.304289');
INSERT INTO `django_admin_log` (`id`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`, `action_time`) VALUES (23, '2', 'Community Service Day', 2, '[{"changed": {"fields": ["Banner"]}}]', 11, 26, '2025-04-27 16:24:43.322938');

-- Table structure for table `django_content_type`
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE django_content_type (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "app_label" VARCHAR(100) NOT NULL,
  "model" VARCHAR(100) NOT NULL
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

-- Table structure for table `auth_permission`
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE auth_permission (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "content_type_id" INT NOT NULL REFERENCES "DJANGO_CONTENT_TYPE" ("ID") DEFERRABLE INITIALLY DEFERRED,
  "codename" VARCHAR(100) NOT NULL,
  "name" VARCHAR(255) NOT NULL
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

-- Table structure for table `auth_group`
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE auth_group (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "name" VARCHAR(150) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `auth_user`
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE auth_user (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "password" VARCHAR(128) NOT NULL,
  "last_login" DATETIME NULL,
  "is_superuser" BOOL NOT NULL,
  "username" VARCHAR(150) NOT NULL UNIQUE,
  "last_name" VARCHAR(150) NOT NULL,
  "email" VARCHAR(254) NOT NULL,
  "is_staff" BOOL NOT NULL,
  "is_active" BOOL NOT NULL,
  "date_joined" DATETIME NOT NULL,
  "first_name" VARCHAR(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `auth_user`
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (1, 'pbkdf2_sha256$870000$uk7uxHobfsEjAvPusAoGAd$3BubDruUCfNV9g/IN9XgKOxXpRVtfwjKHg5yO/g2Uso=', NULL, 1, 'admin', '', '', 1, 1, '2025-04-19 13:06:11.301012', '');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (2, 'pbkdf2_sha256$870000$5dKOyMPDkEOyK4aYGbdFBT$jX3E3H4ZyGDtRkQM43q0RqHg4Q9HwBkawR5munlp8N4=', NULL, 1, 'hanso', '', '', 1, 1, '2025-04-19 13:07:50.143964', '');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (3, 'pbkdf2_sha256$1000000$yRNcMwt45jo1ZZz6I1flRh$gS0Ef+Lhvb9Cj3ARjp4nGgS3rVhQAMTlRvgKJl5xIbo=', '2025-05-02 03:21:36.764367', 1, '12345678', '', '12345678@student.curtin.edu.au', 1, 1, '2025-04-19 13:08:36.789810', '');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (4, 'pbkdf2_sha256$1000000$klZ5rkH0MpuDRo8HGrh5CW$RI2ctTndBywfmzj8IsQ/Z7JZ6of//E8FWfhDgYELm+c=', NULL, 0, '21449723', 'Hartowidjojo', '21449723@student.curtin.edu.au', 0, 1, '2025-04-19 13:24:02.134223', 'Hans');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (5, 'pbkdf2_sha256$1000000$GonaawxbrFKCzToPOZuksJ$x7WWgwIsXb3+1ZPq4AZC3scTIcBf3KbXZusdVDNJUtI=', NULL, 0, '21716304', 'Tanoto', '21716304@student.curtin.edu.au', 0, 1, '2025-04-19 13:24:03.143030', 'Evangeline');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (16, 'pbkdf2_sha256$870000$VXK9FDkfi6SdVRTrmGJfJs$Xrpdg3dhUuCZ3FxFpD0GwAOCCkzoLovgzsLEXY4mpXM=', NULL, 0, '21100001', 'User', '21100001@student.curtin.edu.au', 0, 1, '2025-04-20 07:59:24.950735', 'Dummy1');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (17, 'pbkdf2_sha256$870000$S1A9S81S6qFLHSEqbyfXbc$LcfGGKUcNrFZo3OlkHZtaXzyGciperPeRneBayWpIx4=', NULL, 0, '21100002', 'User', '21100002@student.curtin.edu.au', 0, 1, '2025-04-20 07:59:25.966498', 'Dummy2');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (18, 'pbkdf2_sha256$870000$DbyDFqelSFiZKJaKSp4JZ6$Az70CM3Rl4C3iOH14230P/tVqscaVf/im7jsxJP2hfM=', NULL, 0, '21100003', 'User', '21100003@student.curtin.edu.au', 0, 1, '2025-04-20 07:59:26.964084', 'Dummy3');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (19, 'pbkdf2_sha256$870000$vL6xAEN8KUPlbaQgF39JJ7$1+J0kUjHniVTMTcssepbIFOIa7QCG6fly5OEqJ4QKTU=', NULL, 0, '21100004', 'User', '21100004@student.curtin.edu.au', 0, 1, '2025-04-20 07:59:27.963346', 'Dummy4');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (20, 'pbkdf2_sha256$870000$aHTSfVEGfw9gjRG3OCRWDF$+Cs/XZMrZ7wO0AG4Nvkk7vJjAarAkFyOWYwYjNvFvhk=', NULL, 0, '21100005', 'User', '21100005@student.curtin.edu.au', 0, 1, '2025-04-20 07:59:28.957507', 'Dummy5');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (21, 'pbkdf2_sha256$870000$kJxVb9uW4jZeVVK49OUNjc$ML0GD2AC+7FcfCZAJkLoy4xh3ffdsna/PkaQvHJlQY0=', NULL, 0, '21100006', 'User', '21100006@student.curtin.edu.au', 0, 1, '2025-04-20 07:59:29.967646', 'Dummy6');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (22, 'pbkdf2_sha256$870000$uPCVttfaRdmVBVaCzjUusK$eTf9+bLh/+yBOq0WUIifk/d4ML9l7rTMGr8am+M63X0=', NULL, 0, '21100007', 'User', '21100007@student.curtin.edu.au', 0, 1, '2025-04-20 07:59:30.965661', 'Dummy7');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (23, 'pbkdf2_sha256$870000$kKM26rMULDQAxtX3fuHUUo$U0/DZfclEhxpNQqywjKQ7wXZ4kv5UgBenAktkTkQ1IE=', NULL, 0, '21100008', 'User', '21100008@student.curtin.edu.au', 0, 1, '2025-04-20 07:59:31.966101', 'Dummy8');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (24, 'pbkdf2_sha256$870000$fllNzeqE33GadviwAXQ9R8$t8RkssIrbkR+xIGhABHPiOTBqwuKHVYYLRhbC6X/19U=', NULL, 0, '21100009', 'User', '21100009@student.curtin.edu.au', 0, 1, '2025-04-20 07:59:32.964617', 'Dummy9');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (25, 'pbkdf2_sha256$870000$7BmzXSQYDeaaQpVaxEt0Y2$YMBOlvwazsjM3wvDCclfwc/O6fmf27SYCWlq6pxEEUM=', NULL, 0, '21100010', 'User', '21100010@student.curtin.edu.au', 0, 1, '2025-04-20 07:59:33.965671', 'Dummy10');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (26, 'pbkdf2_sha256$1000000$f5xAU9yN01Q9JPIZd0JuRS$ZinKbV3Pnslp/PbCjBjM1UqunG6dLsr9V+/jVSyBK8U=', '2025-04-26 05:16:37.181652', 1, '87654321', '', '87654321@student.curtin.edu.au', 1, 1, '2025-04-26 05:16:12.879528', '');
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `first_name`) VALUES (27, 'pbkdf2_sha256$1000000$JLMCNvO6xrBLrqUvlV6DJa$D6PgE2lg1WMutzd13B2CR0YuNWt4UM4sJrxD+zNfx+s=', '2025-05-01 08:11:20.150248', 1, '54321', '', '87654321@student.curtin.edu.au', 1, 1, '2025-05-01 08:09:48.826372', '');

-- Table structure for table `django_session`
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE django_session (
  "session_key" VARCHAR(40) NOT NULL PRIMARY KEY,
  "session_data" TEXT,
  "expire_date" DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `django_session`
INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES ('yu4xo1husr3u2glh0lcwir11df9ic90r', '.eJxVjDsOwjAUBO_iGlnPduIPJT1nsNb2Cw4gR8qnQtwdIqWAdmdmXyJiW2vcFp7jWMRZGHH63RLyg9sOyh3tNsk8tXUek9wVedBFXqfCz8vh_h1ULPVbk9XU2dC74JXvkRm5IBXtzABHAJMnKBe002SVD1p13jJTb2AxmCzeH8fyNzY:1u67wM:nthL75tu3lqKthcM3m3BU4CgOVOWxxfYXmiWRbSypEU', '2025-05-03 13:09:02.402588');
INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES ('6kwobxm3mve9znhymezsgv55s3eptt5b', '.eJxVjDsOwjAUBO_iGln-xA6mpM8ZrH1-NgkgR4qTCnF3iJQC2p2ZfYmIbR3j1vISJxYXYbw4_Y6E9Mh1J3xHvc0yzXVdJpK7Ig_a5DBzfl4P9-9gRBu_tU5ItrOAhSk-9AAVsD_DsaOcNfmuC4mKCcn0UNy7oFgrT4FcKNaK9wc6vTjq:1u8Xu1:Zuq8qEoROv_JCji8B-Je4DH3NB8K4bIR5m1F84mRGrA', '2025-05-10 05:16:37.196894');
INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES ('1ssjzmbn8jck6ndd0epwonwak41gejxc', '.eJxVjM0OwiAQhN-FsyHIlp_16N1nIMsCUjU0Ke3J-O62SQ96nPm-mbcItC41rD3PYUziIrQTp98yEj9z20l6ULtPkqe2zGOUuyIP2uVtSvl1Pdy_g0q9bmtriz1bZdEZRgVaAQ4Ok1PFMBCBZ_SYIUZPxhY9IDvaooaSXE5gxOcL3Gs3lw:1uAP0q:aSWfJMW8gi7KeE2pCy9E615ZAgLJIMF6SNgWTCnaA-U', '2025-05-15 08:11:20.158983');
INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES ('23kjpimf04747xn4tczntuat2xutru0e', '.eJxVjM0OwiAQhN-FsyFStvx49O4zkIVdpGogKe3J-O62SQ96nPm-mbcIuC4lrJ3nMJG4CC1Ov13E9OS6A3pgvTeZWl3mKcpdkQft8taIX9fD_Tso2Mu2dj6D8pqMhcGakRXzgD5rRJ0pjjDGyNZkCwq2gMoTIStnyPlkz-DF5wveMDfC:1uAgy0:gEk20AH5vqTTOatDvxY8-Tf_FTBY4sP_kpYu0aJeVNs', '2025-05-16 03:21:36.774865');

-- Table structure for table `user_profile_student`
DROP TABLE IF EXISTS `user_profile_student`;
CREATE TABLE user_profile_student (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "full_name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(254) NOT NULL UNIQUE,
  "studentid" VARCHAR(20) NOT NULL UNIQUE,
  "profile_picture" VARCHAR(100) NULL,
  "badges" TEXT,
  "user_id" INT NOT NULL UNIQUE REFERENCES "AUTH_USER" ("ID") DEFERRABLE INITIALLY DEFERRED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `user_profile_student`
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21449723, 'Hans Hartowidjojo', '21449723@student.curtin.edu.au', '21449723', 'profile_pictures/Greatness_229.JPG', '[]', 4);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21716304, 'Evangeline Tanoto', '21716304@student.curtin.edu.au', '21716304', 'profile_pictures/leader2.jpeg', '[]', 5);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21716315, 'Dummy1 User', '21100001@student.curtin.edu.au', '21100001', '', '[]', 16);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21716316, 'Dummy2 User', '21100002@student.curtin.edu.au', '21100002', '', '[]', 17);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21716317, 'Dummy3 User', '21100003@student.curtin.edu.au', '21100003', '', '[]', 18);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21716318, 'Dummy4 User', '21100004@student.curtin.edu.au', '21100004', '', '[]', 19);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21716319, 'Dummy5 User', '21100005@student.curtin.edu.au', '21100005', '', '[]', 20);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21716320, 'Dummy6 User', '21100006@student.curtin.edu.au', '21100006', '', '[]', 21);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21716321, 'Dummy7 User', '21100007@student.curtin.edu.au', '21100007', '', '[]', 22);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21716322, 'Dummy8 User', '21100008@student.curtin.edu.au', '21100008', '', '[]', 23);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21716323, 'Dummy9 User', '21100009@student.curtin.edu.au', '21100009', '', '[]', 24);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21716324, 'Dummy10 User', '21100010@student.curtin.edu.au', '21100010', '', '[]', 25);
INSERT INTO `user_profile_student` (`id`, `full_name`, `email`, `studentid`, `profile_picture`, `badges`, `user_id`) VALUES (21716325, ' ', '87654321@student.curtin.edu.au', '87654321', '', '[]', 26);

-- Table structure for table `event_page_clubeventpage`
DROP TABLE IF EXISTS `event_page_clubeventpage`;
CREATE TABLE event_page_clubeventpage (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "event_id" BIGINT NOT NULL UNIQUE REFERENCES "ADD_EVENT_EVENT" ("ID") DEFERRABLE INITIALLY DEFERRED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `event_page_clubeventpage`
INSERT INTO `event_page_clubeventpage` (`id`, `event_id`) VALUES (1, 1);
INSERT INTO `event_page_clubeventpage` (`id`, `event_id`) VALUES (2, 2);
INSERT INTO `event_page_clubeventpage` (`id`, `event_id`) VALUES (3, 3);
INSERT INTO `event_page_clubeventpage` (`id`, `event_id`) VALUES (4, 4);
INSERT INTO `event_page_clubeventpage` (`id`, `event_id`) VALUES (7, 7);
INSERT INTO `event_page_clubeventpage` (`id`, `event_id`) VALUES (8, 8);
INSERT INTO `event_page_clubeventpage` (`id`, `event_id`) VALUES (10, 10);

-- Table structure for table `event_registration_eventregistration`
DROP TABLE IF EXISTS `event_registration_eventregistration`;
CREATE TABLE event_registration_eventregistration (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "role" VARCHAR(50) NOT NULL,
  "registered_at" DATETIME NOT NULL,
  "event_id" BIGINT NOT NULL REFERENCES "ADD_EVENT_EVENT" ("ID") DEFERRABLE INITIALLY DEFERRED,
  "student_id" BIGINT NOT NULL REFERENCES "USER_PROFILE_STUDENT" ("ID") DEFERRABLE INITIALLY DEFERRED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `event_registration_eventregistration`
INSERT INTO `event_registration_eventregistration` (`id`, `role`, `registered_at`, `event_id`, `student_id`) VALUES (2, 'Volunteer', '2025-05-02 05:17:17.959569', 3, 21449723);
INSERT INTO `event_registration_eventregistration` (`id`, `role`, `registered_at`, `event_id`, `student_id`) VALUES (22, 'Participant', '2025-05-03 10:34:32.989004', 2, 21449723);

-- Table structure for table `clubs_clubmembership`
DROP TABLE IF EXISTS `clubs_clubmembership`;
CREATE TABLE clubs_clubmembership (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "position" VARCHAR(50) NOT NULL,
  "custom_position" VARCHAR(100) NULL,
  "club_id" BIGINT NOT NULL REFERENCES "CLUBS_CLUB" ("ID") DEFERRABLE INITIALLY DEFERRED,
  "student_id" BIGINT NOT NULL REFERENCES "USER_PROFILE_STUDENT" ("ID") DEFERRABLE INITIALLY DEFERRED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `clubs_clubmembership`
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (1, 'President', NULL, 1, 21449723);
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (2, 'President', NULL, 2, 21716304);
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (3, 'Vice President', NULL, 1, 21716315);
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (4, 'Member', '', 1, 21716316);
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (5, 'Member', NULL, 1, 21716317);
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (6, 'Treasurer', NULL, 1, 21716318);
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (7, 'Member', 'Baby', 1, 21716319);
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (8, 'Member', NULL, 2, 21716320);
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (9, 'Member', NULL, 2, 21716321);
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (10, 'Member', NULL, 2, 21716322);
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (11, 'Member', NULL, 2, 21716323);
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (12, 'Vice President', NULL, 2, 21716324);
INSERT INTO `clubs_clubmembership` (`id`, `position`, `custom_position`, `club_id`, `student_id`) VALUES (74, 'Member', '', 1, 21716304);

-- Table structure for table `clubs_club`
DROP TABLE IF EXISTS `clubs_club`;
CREATE TABLE clubs_club (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "name" VARCHAR(100) NOT NULL,
  "description" TEXT,
  "president_id" BIGINT NULL REFERENCES "USER_PROFILE_STUDENT" ("ID") DEFERRABLE INITIALLY DEFERRED,
  "logo" VARCHAR(100) NULL,
  "banner" VARCHAR(100) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `clubs_club`
INSERT INTO `clubs_club` (`id`, `name`, `description`, `president_id`, `logo`, `banner`) VALUES (1, 'Board Game Club', 'A club where everyone can come and join to play board games and destress, SO JUST COME ON', 21449723, 'club_logos/board-banner_fmCaakc.png', 'club_banners/board-banner_RCan9rb.png');
INSERT INTO `clubs_club` (`id`, `name`, `description`, `president_id`, `logo`, `banner`) VALUES (2, 'Curtin Singapore Community Service Club', 'A club where students can volunteer to help out the Singapore community', 21716304, 'club_logos/ccsc-banner_J72zRsp.png', 'club_banners/chefs-banner_IUt9GX6.png');

-- Table structure for table `add_event_event`
DROP TABLE IF EXISTS `add_event_event`;
CREATE TABLE add_event_event (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "name" VARCHAR(100) NOT NULL,
  "description" TEXT,
  "date" DATE NOT NULL,
  "time" TIME NOT NULL,
  "location" VARCHAR(100) NOT NULL,
  "banner" VARCHAR(100) NOT NULL,
  "club_id" BIGINT NOT NULL REFERENCES "CLUBS_CLUB" ("ID") DEFERRABLE INITIALLY DEFERRED,
  "created_by_id" INT NOT NULL REFERENCES "AUTH_USER" ("ID") DEFERRABLE INITIALLY DEFERRED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `add_event_event`
INSERT INTO `add_event_event` (`id`, `name`, `description`, `date`, `time`, `location`, `banner`, `club_id`, `created_by_id`) VALUES (1, 'Board Games Night', 'An exciting evening of board games and fun!', '2025-04-25', '18:00:00', 'Curtin Singapore, Room 101', 'event_banners/board-event-banner_FM8O0NS.png', 1, 4);
INSERT INTO `add_event_event` (`id`, `name`, `description`, `date`, `time`, `location`, `banner`, `club_id`, `created_by_id`) VALUES (2, 'Community Service Day', 'A day dedicated to giving back to the community.', '2025-05-01', '09:00:00', 'Curtin Singapore, Community Hall', 'event_banners/ccsc-event-banner_yLtq3bV.png', 2, 5);
INSERT INTO `add_event_event` (`id`, `name`, `description`, `date`, `time`, `location`, `banner`, `club_id`, `created_by_id`) VALUES (3, 'Welcoming Party', 'Hi', '2025-04-30', '15:28:00', 'Room 409', 'event_banners/art-event-banner.png', 1, 4);
INSERT INTO `add_event_event` (`id`, `name`, `description`, `date`, `time`, `location`, `banner`, `club_id`, `created_by_id`) VALUES (4, 'Hi', 'Bye', '2025-04-30', '16:25:00', 'Curtin Singapore, Room 409A', 'event_banners/art-event-banner_VjS9PW6.png', 1, 4);
INSERT INTO `add_event_event` (`id`, `name`, `description`, `date`, `time`, `location`, `banner`, `club_id`, `created_by_id`) VALUES (7, 'Hi there', 'Welcome', '2025-05-01', '01:09:00', 'Room 409A, Level 4', 'event_banners/art-banner_e2zThQe.png', 1, 4);
INSERT INTO `add_event_event` (`id`, `name`, `description`, `date`, `time`, `location`, `banner`, `club_id`, `created_by_id`) VALUES (8, 'Bye', 'Hi', '2025-05-02', '11:17:00', 'Curtin SIngapore, Level 4', 'event_banners/art-event-banner_I8fHXcK.png', 1, 4);
INSERT INTO `add_event_event` (`id`, `name`, `description`, `date`, `time`, `location`, `banner`, `club_id`, `created_by_id`) VALUES (10, 'Hielo', 'Hello', '2025-05-07', '17:22:00', 'Curtin Singapore Level 4, Room 409', 'event_banners/art-banner_PkN0UIa.png', 1, 4);

-- Table structure for table `feedback_feedback`
DROP TABLE IF EXISTS `feedback_feedback`;
CREATE TABLE feedback_feedback (
  "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  "satisfaction" VARCHAR(50) NOT NULL,
  "dislike" TEXT,
  "experience" TEXT,
  "like" TEXT,
  "role" VARCHAR(50) NOT NULL,
  "event_id" BIGINT NOT NULL REFERENCES "ADD_EVENT_EVENT" ("ID") DEFERRABLE INITIALLY DEFERRED,
  "student_id" BIGINT NOT NULL REFERENCES "USER_PROFILE_STUDENT" ("ID") DEFERRABLE INITIALLY DEFERRED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data for table `feedback_feedback`
INSERT INTO `feedback_feedback` (`id`, `satisfaction`, `dislike`, `experience`, `like`, `role`, `event_id`, `student_id`) VALUES (1, 'Satisfied', 'you', 'I love you', 'me', 'Participant', 2, 21449723);
INSERT INTO `feedback_feedback` (`id`, `satisfaction`, `dislike`, `experience`, `like`, `role`, `event_id`, `student_id`) VALUES (2, 'Satisfied', 'You', 'I dunno', 'Me', 'Participant', 1, 21716304);
INSERT INTO `feedback_feedback` (`id`, `satisfaction`, `dislike`, `experience`, `like`, `role`, `event_id`, `student_id`) VALUES (3, 'Unsatisfied', 'The Organizers', 'Prettynbad that i cannot get ig from pretty girls', 'The girls', 'Organizer', 2, 21449723);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
