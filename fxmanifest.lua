fx_version ( 'cerulean' )
game ( 'gta5' )

author ({ 'RK' })
version ({ '1.0.0' })

node_version '22'

files ({
    'locales/*.json',
    'static/config.json',
})

server_scripts ({
    'dist/server.js',
})

client_scripts ({
    'dist/client.js',
})

dependencies ({
    'ox_lib',
})

lua54 ( 'true' )