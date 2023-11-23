{
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
          "OS=='mac'",
          {
            "target_name": "kiwi",
            "xcode_settings": {
              "MACOSX_DEPLOYMENT_TARGET": "13.0"
            },
            "libraries": [
              "<(module_root_dir)/lib/libKiwi.a"
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
