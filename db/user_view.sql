CREATE
    ALGORITHM = UNDEFINED
    DEFINER = `root`@`localhost`
    SQL SECURITY DEFINER
VIEW `user_view` AS
    SELECT
        `user`.`user_id` AS `id`,
        `user`.`user_name` AS `name`,
        `user`.`user_password` AS `password`,
        `user`.`user_nick` AS `nick`,
        `user`.`user_privilege` AS `privilege`,
        `user_types`.`type_name` AS `type`
    FROM
        (`user`
        JOIN `user_types`)
    WHERE
        (`user`.`user_privilege` = `user_types`.`type_id`)