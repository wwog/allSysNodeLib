{
  "targets": [
    {
      "target_name": "kiwi",
      "sources": [
        "main.cc"
      ],
      "conditions": [
        [
          "OS=='win'",
          {
            "conditions": [
              [
                "target_arch == 'ia32'",
                {
                  "msvs_settings": {
                    "VCLinkerTool": {
                      "AdditionalDependencies": [
                        "./kiwi32.lib"
                      ]
                    }
                  }
                }
              ],
              [
                "target_arch == 'x64'",
                {
                  "msvs_settings": {
                    "VCLinkerTool": {
                      "AdditionalDependencies": [
                        "./kiwi64.lib"
                      ]
                    }
                  }
                }
              ]
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
            "xcode_settings": {
              "MACOSX_DEPLOYMENT_TARGET": "13.0"
            },
            "libraries": [
              "/Users/sn-0188/Documents/lib/lib/libKiwi.a"
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
        "./lib"
      ],
      "defines": [
        "NAPI_DISABLE_CPP_EXCEPTIONS"
      ]
    }
  ]
}
