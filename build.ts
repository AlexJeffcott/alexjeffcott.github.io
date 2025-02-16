//import { bundle, configs } from 'jsr:@fairfox/deno-esbuild@0.0.21'
import { bundle, configs } from '../deno-esbuild/src/mod.ts'
import * as esbuild from 'npm:esbuild@0.25.0'

  const cfg = await configs.forPreact(
    {
      entryPoints: ['./src/main.tsx'],
      write: true,
    publicPath: '/build',
    loader: {
      '.woff2': 'copy'
    }
    },
    'deno.json',
    'prod',
    'browser',
    '.env',
  )

  bundle(
    cfg,
    esbuild.build,
    esbuild.stop
  )


//import {
//  type Build,
//  type BuildOptions,
//  type BuildResult,
//  type Stop,
//} from './types.d.ts'
//
//// NOTE: bundle({entryPoints: ["./bin/start.ts"]})
//export async function bundle(
//  config: BuildOptions,
//  build: Build,
//  stop: Stop,
//): Promise<BuildResult> {
//  try {
//    return await build(config)
//  } finally {
//    await stop()
//  }
//
//
