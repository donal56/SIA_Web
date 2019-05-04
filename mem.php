<?php
echo memory_get_usage()."\n";
echo memory_get_peak_usage()."=>";
echo gc_collect_cycles()."\n";
echo memory_get_usage()."\n& & ";
echo var_dump(opcache_get_configuration())."\n";
echo var_dump(opcache_get_status());
if (!function_exists('gettext') ) {
    echo "You do not have the gettext library installed with PHP.";
   
}
?>