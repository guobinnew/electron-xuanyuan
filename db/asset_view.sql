CREATE
    ALGORITHM = UNDEFINED
    DEFINER = `root`@`localhost`
    SQL SECURITY DEFINER
VIEW `asset_view` AS
    SELECT
        `assets`.`asset_id` AS `id`,
        `assets`.`asset_sn` AS `sn`,
        `assets`.`asset_purchase_date` AS `purchase_date`,
        `assets`.`asset_checker` AS `checker`,
        `assets`.`asset_type` AS `type`,
        `assets`.`asset_reject` AS `reject`,
        `assets`.`asset_reject_date` AS `reject_date`,
        `asset_types`.`type_name` AS `type_name`,
        `user`.`user_nick` AS `checker_nick`
    FROM
        ((`assets`
        JOIN `asset_types`)
        JOIN `user`)
    WHERE
        ((`asset_types`.`type_id` = `assets`.`asset_type`)
            AND (`user`.`user_id` = `assets`.`asset_checker`))