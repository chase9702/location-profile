package com.carrotins.backend.api.view.data

import lombok.Getter

/**
 * Created by alvin on 2023/05/17.
 */


@Getter
abstract class ProfileFileData(val columns: List<String>, val values: List<List<String>>) {

    abstract val filename: String?
}

