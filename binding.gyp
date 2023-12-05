{
  "includes":["version.gyp"],
  "targets": [
    {
      "target_name": "kiwi",
      "sources": [
        "main.cc"
      ],
      "win_delay_load_hook": "true",
      "conditions": [
        [
          "OS=='win'",
          {
            "target_name": "kiwi_win_64_<(version)",
            "libraries": [
              "<(module_root_dir)/lib/win64.lib"
            ],
            "msvs_settings": {
              "VCCLCompilerTool": {
                "ExceptionHandling": 1
              }
            }
          }
        ],
        [
          "OS=='mac' and target_arch=='arm64'",
          {
            "target_name": "kiwi_mac_arm64_<(version)",
            "xcode_settings": {
              "MACOSX_DEPLOYMENT_TARGET": "13.0"
            },
            "libraries": [
              "<(module_root_dir)/lib/mac_arm64/libKiwi.a"
            ]
          }
        ],
        [
          "OS=='mac' and target_arch=='x64'",
          {
            "target_name": "kiwi_mac_x64_<(version)",
            "xcode_settings": {
              "MACOSX_DEPLOYMENT_TARGET": "13.0"
            },
            "libraries": [
              "<(module_root_dir)/lib/mac_intel64/libKiwi.a"
            ]
          }
        ]
      ],
      "cflags!": [
        "-fno-exceptions"
      ],
      "cflags_cc!": [
        "-fno-exceptions"
      ],
      "include_dirs": [
        "<!(node -p \"require('node-addon-api').include_dir\")",
        "<!@(node -p \"require('node-addon-api').include\")",
        "<(module_root_dir)/lib"
      ],
      "defines": [
        "NAPI_DISABLE_CPP_EXCEPTIONS"
      ]
    }
  ]
}
